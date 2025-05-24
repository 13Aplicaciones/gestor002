/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Badge,
  Callout,
  Container,
  DataList,
  Flex,
  Heading,
  HoverCard,
  Link,
  Separator,
} from "@radix-ui/themes";
import { useTranslation } from "react-i18next";
import { Alerts, FormatMaskISO } from "../../ConstantsPresentation";
import { formatDateMask } from "../../utils/FormatMask";
import { alertColor, alertIcon, alertVariant } from "../IconosColoresAlerts";

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
const BannerInformation = ({
  alert,
  message,
}: {
  alert: Alerts;
  message?: string;
}) => {
  if (message === "" || message === undefined) {
    return null;
  }

  return (
    <Container py={{ xs: "1", sm: "1", md: "2", lg: "3", xl: "4" }}>
      <Callout.Root
        size="1"
        color={alertColor({ alert })}
        variant={alertVariant({ alert })}
      >
        <Callout.Icon>{alertIcon({ alert })}</Callout.Icon>
        <Callout.Text>
          <span dangerouslySetInnerHTML={{ __html: message }} />
        </Callout.Text>
      </Callout.Root>
    </Container>
  );
};

/**
 * Muestra la información del registro.
 *
 * {
 *  "user":"",
 *  "userData":"",
 *  "userModify":"",
 *  "userApp":""
 * }
 *
 * @param row Registro a mostrar
 * @returns
 */
const InformationPanelRegistration = ({ row }: { row: any }) => {
  const [t] = useTranslation("global_ux");

  if (
    row === undefined ||
    row === null ||
    Object.keys(row).length === 0 ||
    row.userApp === ""
  ) {
    return <></>;
  }

  return (
    <HoverCard.Root>
      <HoverCard.Trigger>
        <Link size="2">@{t("infoPanelRegistration.link")}</Link>
      </HoverCard.Trigger>
      <HoverCard.Content>
        <Flex direction="column" gap="2">
          <Heading size="2">{t("infoPanelRegistration.title")}</Heading>
          <Separator orientation="horizontal" size="4" />
          <DataList.Root>
            {row.userApp && (
              <DataList.Item>
                <DataList.Label>
                  {t("infoPanelRegistration.usuarioPrograma")}
                </DataList.Label>
                <DataList.Value>{row.userApp}</DataList.Value>
              </DataList.Item>
            )}
            {row.userDate && (
              <DataList.Item>
                <DataList.Label>
                  {t("infoPanelRegistration.usuarioFecha")}
                </DataList.Label>
                <DataList.Value>
                  {formatDateMask(row.userDate, FormatMaskISO.dateHour)}
                </DataList.Value>
              </DataList.Item>
            )}
            {row.userModify && (
              <DataList.Item>
                <DataList.Label>
                  {t("infoPanelRegistration.usuarioFechaModify")}
                </DataList.Label>
                <DataList.Value>
                  {formatDateMask(row.userModify, FormatMaskISO.dateHour)}
                </DataList.Value>
              </DataList.Item>
            )}
            {row.user && (
              <DataList.Item>
                <DataList.Label>
                  {t("infoPanelRegistration.usuario")}
                </DataList.Label>
                <DataList.Value>
                  <Badge color="crimson" variant="soft" radius="full">
                    {row.user}
                  </Badge>
                </DataList.Value>
              </DataList.Item>
            )}
          </DataList.Root>
        </Flex>
      </HoverCard.Content>
    </HoverCard.Root>
  );
};

export { BannerInformation, InformationPanelRegistration };
