/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex } from "@radix-ui/themes";
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
import {
  Alerts,
  BannerInformation,
  DataListConfigurable,
  DataListSkeleton
} from "ux-ui";
import { Menus, MODULE } from "../../utils/Constants";
import { dataViewPresentation } from "./Estructures/Presentations";
import { createIRowDataModule, IRowDataModule } from "./Estructures/Types";

/**
 * Función para tener una vista previa de los Modulees del sistema.
 *
 * @param row Fila de datos a editar
 * @returns
 */
const PreviewModule = ({ row }: { row?: IRowDataModule }) => {
  const [alertForm, setAlertForm] = useState<Alerts>(Alerts.warning);
  const [loading, setLoading] = useState(false);
  const [messageForm, setMessageForm] = useState<string>("");
  const [rowFound, setRowFound] = useState<IRowDataModule | null>(
    createIRowDataModule()
  );

  /**
   * Cargar la vista previa del registro.
   */
  useEffect(() => {
    const loadPreview = (row: any) => {
      setLoading(true);
      setTimeout(async () => {
        await runApi(row.uuid || "");
        setLoading(false);
      }, 333);
    };

    loadPreview(row);
  }, [row]);

  /**
   * Cargar la vista previa del registro.
   */

  const runApi = async (uuid: string) => {
    const tokenTemp: ITokenRoot = await getToken();
    const parameterTemp: IParameter = await getParameter(MODULE, "200");
    parameterTemp.valueText01 =
      parameterTemp.valueText01 + Menus.MODULE_ENDPOINT;

    fetchData({
      url: parameterTemp?.valueText01 + "/" + uuid,
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
        setRowFound(response.response);
      })
      .catch((Module) => {
        setMessageForm("Module message: " + Module);
        setAlertForm(Alerts.error);
        return null;
      });
  };

  return (
    <Flex direction="column" gap="3" maxWidth={{ md: "50vw", xl: "1400px" }}>
      {(messageForm && (
        <BannerInformation message={messageForm} alert={alertForm} />
      )) ||
        (loading ? (
          <DataListSkeleton column={5} />
        ) : (
          <DataListConfigurable
            presentationDataList={dataViewPresentation()}
            data={rowFound}
          />
        ))}
    </Flex>
  );
};

export { PreviewModule };
