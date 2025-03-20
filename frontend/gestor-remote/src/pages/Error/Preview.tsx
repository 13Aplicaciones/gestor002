import { Badge, DataList, Flex } from "@radix-ui/themes";
import {
  Alerts,
  BannerInformation,
  formatDateMask,
  FormatMaskISO,
} from "ux-ui";
import { createIRowDataError, IRowDataError } from "./Types";
import { fetchData, MethodREST, TypeBody } from "api-fetch";
import {
  getParameter,
  IParameter,
} from "orchestrator_remote/service/Parameter";
import {
  getToken,
  ITokenRoot,
  refreshToken,
} from "orchestrator_remote/service/Tokens";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Función para tener una vista previa de los errores del sistema.
 * 
 * @param index para realizar la consulta de la vista previa. 
 * @returns 
 */
const Preview = ({ index }: { index: string }) => {
  const [t] = useTranslation("global_gestor");
  const [messageForm, setMessageForm] = useState<string>("");
  const [alertForm, setAlertForm] = useState<Alerts>(Alerts.warning);
  const [row, setRow] = useState<IRowDataError | null>(createIRowDataError());

  /**
   * Cargar la vista previa del registro.
   */
  useEffect(() => {
    const cargarVistaPrevia = async (indexError: string) => {
      const tokenTemp: ITokenRoot = await getToken();
      const parameterTemp: IParameter = await getParameter("GS_001_00", "200");

      fetchData({
        url: parameterTemp?.valueText01 + "/index=" + indexError,
        methodRest: MethodREST.GET,
        typeBody: TypeBody.NONE,
        bodyParameter: null,
        token: tokenTemp.access_token,
        getToken() {
          return refreshToken();
        },
      })
        .then((response) => {
          if (response.error) {
            setMessageForm(response?.statusDescription || "");
            setAlertForm(Alerts.info);
            return null;
          }
          setRow(response.response);
        })
        .catch((error) => {
          setMessageForm("Error message: " + error);
          setAlertForm(Alerts.error);
          return null;
        });
    };

    cargarVistaPrevia(index);
  }, [index]);

  return (
    <Flex direction="column" gap="3" maxWidth={{ md: "50vw", xl: "1400px" }}>
      {(messageForm && (
        <BannerInformation message={messageForm} alert={alertForm} />
      )) || (
        <DataList.Root>
          <DataList.Item>
            <DataList.Label minWidth="88px">UUID</DataList.Label>
            <DataList.Value>
              <Badge color="crimson" variant="soft" radius="full">
                {row?.uuid || ""}
              </Badge>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">{t('modules.error.fields.indexError.title')}</DataList.Label>
            <DataList.Value>
              <span
                dangerouslySetInnerHTML={{ __html: row?.indexError || "" }}
              />
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">{t('modules.error.fields.message.title')}</DataList.Label>
            <DataList.Value>
              <span dangerouslySetInnerHTML={{ __html: row?.message || "" }} />
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">{t('modules.error.fields.description.title')}</DataList.Label>
            <DataList.Value>
              <span
                dangerouslySetInnerHTML={{ __html: row?.description || "" }}
              />
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">{t('modules.error.fields.user.title')}</DataList.Label>
            <DataList.Value>{row?.user || ""}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">{t('modules.error.fields.userDate.title')}</DataList.Label>
            <DataList.Value>
              {formatDateMask(row?.userDate || "", FormatMaskISO.dateHour)}
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">{t('modules.error.fields.userApp.title')}</DataList.Label>
            <DataList.Value>{row?.userApp || ""}</DataList.Value>
          </DataList.Item>
        </DataList.Root>
      )}
    </Flex>
  );
};

export { Preview };
