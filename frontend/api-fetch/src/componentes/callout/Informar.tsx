/* eslint-disable @typescript-eslint/no-explicit-any */
import { alertaColor, alertaIcono, alertaVariant } from "../IconosColoresAlertas";
import { Alertas } from "../../ConstantesPresentacion";
import { Badge, Callout, Container, DataList, Flex, Heading, HoverCard, Link } from "@radix-ui/themes"
import { useTranslation } from "react-i18next";

/**
 * Clase que representa los tipos de mensajes que se pueden mostrar en la aplicación.
 * 
 * @autor @omargo33
 * @since 2025-01-20
 * 
 */

/**
 * Presenta un mensaje en la pantalla. 
 * 
 * @param mensaje Mensaje a mostrar
 * @param alerta Tipo de mensaje a mostrar
 * @returns 
 */
const BannerInformacion = ({ alerta, mensaje }: { alerta: Alertas, mensaje?: string }) => {

    if (mensaje === "" || mensaje === undefined) {
        return null
    }

    return (
        <Container py={{ xs: "1", sm: "1", md: "2", lg: "3", xl: "4" }}>
            <Callout.Root size="1" color={alertaColor({ alerta })} variant={alertaVariant({ alerta })} >
                <Callout.Icon>
                    {alertaIcono({ alerta })}
                </Callout.Icon>
                <Callout.Text>
                    <span dangerouslySetInnerHTML={{ __html: mensaje }} />
                </Callout.Text>
            </Callout.Root>
        </Container>
    );
}

/**
 * Muestra la información del registro.
 * 
 * {
 *  "usuario":"",
 *  "usuarioFecha":"",
 *  "usuarioFechaCreacion":"",
 *  "usuarioPrograma":""
 * }
 * 
 * @param row Registro a mostrar 
 * @returns 
 */
const InfoPanelRegistro = ({ row }: { row: any }) => {
    const [t] = useTranslation("global");

    if (row === undefined || row === null || Object.keys(row).length === 0 || row.usuarioPrograma === "") {
        return (
            <></>
        );
    }

    return (
        <HoverCard.Root>
            <HoverCard.Trigger>
                <Link size="2">
                    @{t("infoPanelRegistro.titulo")}
                </Link>
            </HoverCard.Trigger>
            <HoverCard.Content >
                <Flex direction="column" gap="3">
                    <Heading size="2">{t("infoPanelRegistro.titulo")}</Heading>
                    <DataList.Root>
                        {row.usuario &&
                            <DataList.Item >
                                <DataList.Label minWidth={{ md: "80px" }} >{t("infoPanelRegistro.usuario")}</DataList.Label>
                                <DataList.Value>
                                    <Badge color="crimson" variant="soft" radius="full">
                                        {row.usuario}
                                    </Badge>
                                </DataList.Value>
                            </DataList.Item>
                        }
                        {row.usuarioFechaCreacion &&
                            <DataList.Item >
                                <DataList.Label minWidth={{ md: "80px" }}>{t("infoPanelRegistro.usuarioFechaCreacion")}</DataList.Label>
                                <DataList.Value>
                                    {row.usuarioFechaCreacion}
                                </DataList.Value>
                            </DataList.Item>
                        }
                        {row.usuarioFecha &&
                            <DataList.Item >
                                <DataList.Label minWidth={{ md: "80px" }}>{t("infoPanelRegistro.usuarioFecha")}</DataList.Label>
                                <DataList.Value>
                                    {row.usuarioFecha}
                                </DataList.Value>
                            </DataList.Item>
                        }
                        {row.usuarioPrograma &&
                            <DataList.Item >
                                <DataList.Label minWidth={{ md: "80px" }}>{t("infoPanelRegistro.usuarioPrograma")}</DataList.Label>
                                <DataList.Value>{row.usuarioPrograma}</DataList.Value>
                            </DataList.Item>
                        }
                    </DataList.Root>
                </Flex>
            </HoverCard.Content>
        </HoverCard.Root>
    );
}

export { BannerInformacion, InfoPanelRegistro };