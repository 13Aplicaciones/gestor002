/* eslint-disable @typescript-eslint/no-explicit-any */
import { alertColor, alertIcon, alertVariant } from "../IconosColoresAlerts";
import { Alerts } from "../../ConstantsPresentation";
import { Badge, Callout, Container, DataList, Flex, Heading, HoverCard, Link } from "@radix-ui/themes"
import { useTranslation } from "react-i18next";

/**
 * Clase que representa los tipos de messages que se pueden mostrar en la aplicación.
 * 
 * @autor @omargo33
 * @since 2025-01-20
 * 
 */

/**
 * Presenta un message en la pantalla. 
 * 
 * @param message Mensaje a mostrar
 * @param alert Tipo de message a mostrar
 * @returns 
 */
const BannerInformation = ({ alert, message }: { alert: Alerts, message?: string }) => {

    if (message === "" || message === undefined) {
        return null
    }

    return (
        <Container py={{ xs: "1", sm: "1", md: "2", lg: "3", xl: "4" }}>
            <Callout.Root size="1" color={alertColor({ alert })} variant={alertVariant({ alert })} >
                <Callout.Icon>
                    {alertIcon({ alert })}
                </Callout.Icon>
                <Callout.Text>
                    <span dangerouslySetInnerHTML={{ __html: message }} />
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
const InformationPanelRegistration = ({ row }: { row: any }) => {
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
                    @{t("infoPanelRegistration.title")}
                </Link>
            </HoverCard.Trigger>
            <HoverCard.Content >
                <Flex direction="column" gap="3">
                    <Heading size="2">{t("infoPanelRegistration.title")}</Heading>
                    <DataList.Root>
                        {row.usuario &&
                            <DataList.Item >
                                <DataList.Label minWidth={{ md: "80px" }} >{t("infoPanelRegistration.usuario")}</DataList.Label>
                                <DataList.Value>
                                    <Badge color="crimson" variant="soft" radius="full">
                                        {row.usuario}
                                    </Badge>
                                </DataList.Value>
                            </DataList.Item>
                        }
                        {row.usuarioFechaCreacion &&
                            <DataList.Item >
                                <DataList.Label minWidth={{ md: "80px" }}>{t("infoPanelRegistration.usuarioFechaCreacion")}</DataList.Label>
                                <DataList.Value>
                                    {row.usuarioFechaCreacion}
                                </DataList.Value>
                            </DataList.Item>
                        }
                        {row.usuarioFecha &&
                            <DataList.Item >
                                <DataList.Label minWidth={{ md: "80px" }}>{t("infoPanelRegistration.usuarioFecha")}</DataList.Label>
                                <DataList.Value>
                                    {row.usuarioFecha}
                                </DataList.Value>
                            </DataList.Item>
                        }
                        {row.usuarioPrograma &&
                            <DataList.Item >
                                <DataList.Label minWidth={{ md: "80px" }}>{t("infoPanelRegistration.usuarioPrograma")}</DataList.Label>
                                <DataList.Value>{row.usuarioPrograma}</DataList.Value>
                            </DataList.Item>
                        }
                    </DataList.Root>
                </Flex>
            </HoverCard.Content>
        </HoverCard.Root>
    );
}

export { BannerInformation, InformationPanelRegistration };