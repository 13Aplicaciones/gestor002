/* eslint-disable @typescript-eslint/no-explicit-any */
import { alertColor } from "../components/IconosColoresAlerts";
import { Alerts, BandaPresentacion, Direccion, EstadoEdicion } from "../ConstantsPresentation";
import { AreaField, InputField } from "../components/input/Input";
import { BannerInformation, InformationPanelRegistration } from "../components/callout/Information";
import { Button, Flex } from "@radix-ui/themes";
import { DialogAlerts } from "../components/dialog/Dialog";
import { fetchData, IFetchData } from "../services/Api";
import { FooterForm, FormState } from "../components/form/Form";
import { hideDialogDinamico, showDialogDinamico } from "../store/DialogSlice";
import { IRowDataError } from "./ErroresVistaPrevia";
import { MethodREST, TypeBody } from "../APIConstants";
import { requestToken } from "../services/Token";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useToastContext } from "../components/toast/useToastContext";

/**
 * Formulario de edición de errores del sistema.
 * 
 * @author @omargo33
 * 
 * @param param0 
 * @returns 
 */
const ErrorEdit = ({ estado, row, onAtras = () => { } }: { estado: EstadoEdicion, row?: IRowDataError, onAtras?: () => void }) => {

    const { showToast } = useToastContext();
    const [stateFormulario, setFormStateulario] = useState<EstadoEdicion>(estado || EstadoEdicion.create);
    const [messageFormulario, setMessageForm] = useState("");
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
            .required("El message es requerido")
            .max(1024, "El message debe tener máximo 124 caracteres"),
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
                    if (stateFormulario === EstadoEdicion.create) {
                        fetchData({
                            url: "http://localhost:8090/gestor-ws/api/errors",
                            methodRest: MethodREST.POST,
                            typeBody: TypeBody.JSON,
                            bodyParameter: data,
                            token: token
                        }).then(response => {
                            analizarAccionar(response);
                            setFormStateulario(EstadoEdicion.edit);
                        }).catch(error => {
                            setMessageForm("Error al crear el registro: " + error);
                            return null;
                        });
                    }
                    if (stateFormulario === EstadoEdicion.edit) {
                        fetchData({
                            url: "http://localhost:8090/gestor-ws/api/errors/" + uuid,
                            methodRest: MethodREST.PUT,
                            typeBody: TypeBody.JSON,
                            bodyParameter: data,
                            token: token
                        }).then(response => {
                            analizarAccionar(response);
                        }).catch(error => {
                            setMessageForm("Error al accionar el registro " + error);
                            return null;
                        });
                    }
                    if (stateFormulario === EstadoEdicion.block) {
                        fetchData({
                            url: "http://localhost:8090/gestor-ws/api/errors/" + uuid,
                            methodRest: MethodREST.DELETE,
                            typeBody: TypeBody.NONE,
                            bodyParameter: null,
                            token: token
                        }).then(response => {
                            analizarAccionar(response);
                            setFormStateulario(EstadoEdicion.find);
                            dispatch(hideDialogDinamico('1'));
                            onAtras();
                        }).catch(error => {
                            setMessageForm("Error al borrar el registro " + error);
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
                showToast(
                    response.error + ' ' + response.status.toString(),
                    response.responseErrorJSON.message,
                     Alerts.warning
                );
            } else {
                showToast(
                     response.status.toString(),
                     response.error,
                     Alerts.warning
                );
            }
            return;
        } else {
            const respuesta = response;
            if (respuesta.response && respuesta.response.uuid) {
                setUuid(respuesta.response.uuid);
            }
            showToast(
                 respuesta.status.toString(),
                 "Accion realizada con exito",
                Alerts.success
            );
        }
    }

    const showPopUpDelete = () => {
        setFormStateulario(EstadoEdicion.block);
        dispatch(showDialogDinamico('1'));
    }

    return (
        <>
            <BannerInformation message={messageFormulario} alert={Alerts.error} />
            <Flex direction="row" gap="3" align="center">
                <FormState statusEdit={stateFormulario} />
                <InformationPanelRegistration row={row} />
            </Flex>
            <DialogAlerts
                id='1'
                title="Desae borrar el Registro"
                description="Una ves borrado el registro <strong>no se podra recuperar</strong> </br> </br> <strong>¿Desea continuar?</strong>"
                alert={Alerts.error}
                cancel={false}
                buttons={
                    <>
                        <Button size="3" disabled={loading}
                            color={alertColor({ alert: Alerts.error })}
                            variant="solid"
                            onClick={() => { accionar(null); }
                            }>Si, Borrar</Button>
                        <Button size="3" onClick={() => {
                            setFormStateulario(EstadoEdicion.edit);
                            dispatch(hideDialogDinamico('1'));
                        }}>No, Cancelar</Button>
                    </>
                }
            >
            </DialogAlerts>
            <form onSubmit={handleSubmit(accionar)}>
                <InputField
                    title="Indice"
                    columns={BandaPresentacion.columna_3}
                    placeholder="ERR001"
                    directionLabel={Direccion.horizontal}
                    register={register("indice", { required: true })}
                    messageError={errors.indice?.message} />
                <AreaField
                    title="Mensaje"
                    columns={BandaPresentacion.columna_2}
                    rows={3}
                    placeholder="Error al procesar la solicitud"
                    directionLabel={Direccion.horizontal}
                    register={register("mensaje", { required: true })}
                    messageError={errors.mensaje?.message} />
                <AreaField
                    title="Descripción"
                    columns={BandaPresentacion.columna_1}
                    rows={5}
                    placeholder="Descripción detallada del error"
                    directionLabel={Direccion.horizontal}
                    register={register("descripcion")}
                    messageError={errors.descripcion?.message} />
                <FooterForm directionLabel={Direccion.horizontal} columns={BandaPresentacion.columna_2}>
                    <Button type="submit" disabled={loading} >Guardar</Button>
                    <Button type="button" variant="surface"
                        disabled={stateFormulario === EstadoEdicion.create}
                        onClick={() => { showPopUpDelete() }}>Borrar</Button>
                </FooterForm>
            </form>
        </>
    );
}

export default ErrorEdit;
