import { Badge, DataList, Flex, Heading } from "@radix-ui/themes";
import { fetchData } from "../api/Api";
import { MetodosREST, TipoBody } from "../ConstantesAPI";
import { requestToken } from "../api/Token";
import { useCallback, useEffect, useState } from "react";
import { BannerInformacion } from "../componentes/callout/Informar";
import { Alertas } from "../ConstantesPresentacion";

/**
 * Interfaz para el objeto de respuesta de la llamada.
 */
export interface IRowDataError {
    mensaje: string;
    descripcion: string;
    uuid: string;
    indice: string;
    usuario: string;
    usuarioFecha: string;
    usuarioPrograma: string;
}

const VistaPrevia = ({ indice }: { indice: string }) => {
    const [mensajeFormulario, setMensajeFormulario] = useState("");
    const [row, setRow] = useState<IRowDataError | null>(null);

    const cargarVistaPrevia = useCallback(async () => {
        let token = "";
        await requestToken().then((credencial) => {
            if (credencial?.access_token) {
                token = credencial.access_token;
                fetchData({
                    url: "http://localhost:8090/gestor-ws/api/errors/indice=" + indice,
                    methodRest: MetodosREST.GET,
                    tipoBody: TipoBody.NONE,
                    bodyParametro: null,
                    token: token
                }).then(response => {
                    setRow(response.response);
                }).catch(error => {
                    setMensajeFormulario("Error al consultar " + error);
                    return null;
                });
            }
        });
    }, [indice]);

    useEffect(() => {
        cargarVistaPrevia();
    }, [cargarVistaPrevia]);

    return (
        <Flex direction="column" gap="3" maxWidth={{ md: '50vw', xl: '1400px' }}>
            <BannerInformacion mensaje={mensajeFormulario} alerta={Alertas.error} />
            <Heading size="2">Información del registro</Heading>
            <DataList.Root>
                <DataList.Item >
                    <DataList.Label minWidth="88px">Mensaje</DataList.Label>
                    <DataList.Value>
                        <span dangerouslySetInnerHTML={{ __html: row?.mensaje || '' }} />
                    </DataList.Value>
                </DataList.Item>
                <DataList.Item >
                    <DataList.Label minWidth="88px">Mensaje</DataList.Label>
                    <DataList.Value>
                        <span dangerouslySetInnerHTML={{ __html: row?.descripcion || '' }} />
                    </DataList.Value>
                </DataList.Item>
                <DataList.Item >
                    <DataList.Label minWidth="88px">UUID</DataList.Label>
                    <DataList.Value>
                        <Badge color="crimson" variant="soft" radius="full">
                            {row?.uuid || ''}
                        </Badge>
                    </DataList.Value>
                </DataList.Item>
                <DataList.Item >
                    <DataList.Label minWidth="88px">Indice</DataList.Label>
                    <DataList.Value>
                        {row?.indice || ''}
                    </DataList.Value>
                </DataList.Item>
                <DataList.Item >
                    <DataList.Label minWidth="88px">Usuario</DataList.Label>
                    <DataList.Value>
                        {row?.usuario || ''}
                    </DataList.Value>
                </DataList.Item>
                <DataList.Item >
                    <DataList.Label minWidth="88px">Fecha</DataList.Label>
                    <DataList.Value>
                        {row?.usuarioFecha || ''}
                    </DataList.Value>
                </DataList.Item>
                <DataList.Item >
                    <DataList.Label minWidth="88px">Aplicativo</DataList.Label>
                    <DataList.Value>
                        {row?.usuarioPrograma || ''}
                    </DataList.Value>
                </DataList.Item>
            </DataList.Root>
        </Flex>
    )
}

export default VistaPrevia;