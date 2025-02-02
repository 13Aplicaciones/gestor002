/* eslint-disable @typescript-eslint/no-explicit-any */
import { alertaColor } from "../componentes/IconosColoresAlertas";
import { Alertas, BandaPresentacion, Direccion, EstadoEdicion } from "../ConstantesPresentacion";
import { AreaField, InputField } from "../componentes/input/Input";
import { BannerInformacion, InfoPanelRegistro } from "../componentes/callout/Informar";
import { Button, Flex } from "@radix-ui/themes";
import { DialogAlertas } from "../componentes/dialog/Dialgo";
import { fetchData, IFetchData } from "../api/Api";
import { FooterForm, EstadoForm } from "../componentes/form/PieBotones";
import { hideDialogDinamico, showDialogDinamico } from "../redux/Store";
import { IRowDataError } from "./ErroresVistaPrevia";
import { MetodosREST, TipoBody } from "../ConstantesAPI";
import { requestToken } from "../api/Token";
import { toast } from "../componentes/toast/Toast";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

/**
 * Formulario de edición de errores del sistema.
 * 
 * @author @omargo33
 * 
 * @param param0 
 * @returns 
 */
const ErrorEdit = ({ estado, row, onAtras = () => { } }: { estado: EstadoEdicion, row?: IRowDataError, onAtras?: () => void }) => {

    const [estadoFormulario, setEstadoFormulario] = useState<EstadoEdicion>(estado || EstadoEdicion.crear);
    const [mensajeFormulario, setMensajeFormulario] = useState("");
    const [uuid, setUuid] = useState(row ? row.uuid : "");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const schema = yup.object({
        indice: yup
            .string()
            .required("El indice es requerido")
            .min(5, "El indice debe tener mínimo 5 caracter")
            .max(128, "El indice debe tener máximo 10 caracteres"),
        mensaje: yup
            .string()
            .required("El mensaje es requerido")
            .max(1024, "El mensaje debe tener máximo 124 caracteres"),
        descripcion: yup
            .string()
            .max(4098, "La descripción debe tener máximo 4098 caracteres"),
        usuarioPrograma: yup
            .string(),
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            indice: row?.indice || "",
            mensaje: row?.mensaje || "",
            descripcion: row?.descripcion || "",
            usuarioPrograma: row?.usuarioPrograma || ""
        }
    });

    const accionar = async (data: any) => {
        setLoading(true)
        const nombreAplicativo = window.location.pathname.split('/').pop() + "miNuevoDato";
        data = { ...data, usuarioPrograma: nombreAplicativo };

        setTimeout(async () => {
            let token = "";
            await requestToken().then((credencial) => {
                if (credencial?.access_token) {
                    token = credencial.access_token;
                    if (estadoFormulario === EstadoEdicion.crear) {
                        fetchData({
                            url: "http://localhost:8090/gestor-ws/api/errors",
                            methodRest: MetodosREST.POST,
                            tipoBody: TipoBody.JSON,
                            bodyParametro: data,
                            token: token
                        }).then(response => {
                            analizarAccionar(response);
                            setEstadoFormulario(EstadoEdicion.editar);
                        }).catch(error => {
                            setMensajeFormulario("Error al crear el registro: " + error);
                            return null;
                        });
                    }
                    if (estadoFormulario === EstadoEdicion.editar) {
                        fetchData({
                            url: "http://localhost:8090/gestor-ws/api/errors/" + uuid,
                            methodRest: MetodosREST.PUT,
                            tipoBody: TipoBody.JSON,
                            bodyParametro: data,
                            token: token
                        }).then(response => {
                            analizarAccionar(response);
                        }).catch(error => {
                            setMensajeFormulario("Error al accionar el registro " + error);
                            return null;
                        });
                    }
                    if (estadoFormulario === EstadoEdicion.bloquear) {
                        fetchData({
                            url: "http://localhost:8090/gestor-ws/api/errors/" + uuid,
                            methodRest: MetodosREST.DELETE,
                            tipoBody: TipoBody.NONE,
                            bodyParametro: null,
                            token: token
                        }).then(response => {
                            analizarAccionar(response);
                            setEstadoFormulario(EstadoEdicion.buscar);
                            dispatch(hideDialogDinamico('1'));
                            onAtras();
                        }).catch(error => {
                            setMensajeFormulario("Error al borrar el registro " + error);
                            return null;
                        });
                    }
                }
            });

            setLoading(false);
        }, 333);
    }

    const analizarAccionar = (response: IFetchData) => {
        if (response.error) {
            if (response.status === 400) {
                toast({
                    title: response.error + ' ' + response.status.toString(),
                    description: response.responseErrorJSON.message,
                    alerta: Alertas.warning
                });
            } else {
                toast({
                    title: response.status.toString(),
                    description: response.error,
                    alerta: Alertas.warning
                });
            }
            return;
        } else {
            const respuesta = response;
            if (respuesta.response && respuesta.response.uuid) {
                setUuid(respuesta.response.uuid);
            }
            toast({
                title: respuesta.status.toString(),
                description: "Accion realizada con exito",
                alerta: Alertas.success
            });
        }
    }

    const showPopUpDelete = () => {
        setEstadoFormulario(EstadoEdicion.bloquear);
        dispatch(showDialogDinamico('1'));
    }

    return (
        <>
            <BannerInformacion mensaje={mensajeFormulario} alerta={Alertas.error} />
            <Flex direction="row" gap="3" align="center">
                <EstadoForm estadoEdicion={estadoFormulario} />
                <InfoPanelRegistro row={row} />
            </Flex>
            <DialogAlertas
                id='1'
                titulo="Desae borrar el Registro"
                descripcion="Una ves borrado el registro <strong>no se podra recuperar</strong> </br> </br> <strong>¿Desea continuar?</strong>"
                alerta={Alertas.error}
                cancel={false}
                buttons={
                    <>
                        <Button size="3" disabled={loading}
                            color={alertaColor({ alerta: Alertas.error })}
                            variant="solid"
                            onClick={() => { accionar(null); }
                            }>Si, Borrar</Button>
                        <Button size="3" onClick={() => {
                            setEstadoFormulario(EstadoEdicion.editar);
                            dispatch(hideDialogDinamico('1'));
                        }}>No, Cancelar</Button>
                    </>
                }
            >
            </DialogAlertas>
            <form onSubmit={handleSubmit(accionar)}>
                <InputField
                    titulo="Indice"
                    columnas={BandaPresentacion.columna_3}
                    placeholder="ERR001"
                    direccionLabel={Direccion.horizontal}
                    register={register("indice", { required: true })}
                    mensajeError={errors.indice?.message} />
                <AreaField
                    titulo="Mensaje"
                    columnas={BandaPresentacion.columna_2}
                    rows={3}
                    placeholder="Error al procesar la solicitud"
                    direccionLabel={Direccion.horizontal}
                    register={register("mensaje", { required: true })}
                    mensajeError={errors.mensaje?.message} />
                <AreaField
                    titulo="Descripción"
                    columnas={BandaPresentacion.columna_1}
                    rows={5}
                    placeholder="Descripción detallada del error"
                    direccionLabel={Direccion.horizontal}
                    register={register("descripcion")}
                    mensajeError={errors.descripcion?.message} />
                <FooterForm direccionLabel={Direccion.horizontal} columnas={BandaPresentacion.columna_2}>
                    <Button type="submit" disabled={loading} >Guardar</Button>
                    <Button type="button" variant="surface"
                        disabled={estadoFormulario === EstadoEdicion.crear}
                        onClick={() => { showPopUpDelete() }}>Borrar</Button>
                </FooterForm>
            </form>
        </>
    );
}

export default ErrorEdit;
