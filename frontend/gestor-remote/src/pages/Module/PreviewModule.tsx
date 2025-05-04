import {
  getParameter,
  IParameter,
} from "orchestrator_remote/service/Parameter";
import { getToken, ITokenRoot, refreshToken } from "orchestrator_remote/service/Tokens";
import { useEffect, useState } from "react";
import { GenericPreview } from "ux-ui";
import { Menus, MODULE } from "../../utils/Constants";
import { dataViewPresentation } from "./Structures/Presentations";
import { createIRowDataModule, IRowDataModule } from "./Structures/Types";

/**
 * Función para tener una vista previa de los Modules del sistema.
 */
const PreviewModule = ({ row }: { row?: IRowDataModule }) => {
  const [apiUrl, setApiUrl] = useState("");
  const [token, setToken] = useState<string | undefined>(undefined);

  /**
   * Inicializar token y parámetros de URL
   */
  useEffect(() => {
    getToken()
      .then((t: ITokenRoot) => setToken(t.access_token))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!row) {
      setApiUrl("");
      return;
    }

    (async () => {
      try {
        const param: IParameter = await getParameter(MODULE, "200");
        const url = `${param.valueText01}${Menus.MODULE_ENDPOINT}/${row.uuid}`;
        setApiUrl(url);
      } catch (err) {
        console.error("Error generando API URL:", err);
        setApiUrl("");
      }
    })();
  }, [row]);

  return (
    <>
      {!apiUrl || !token ? (
        <></>
      ) : (
        <GenericPreview<IRowDataModule>
          apiUrl={apiUrl}
          createEmptyData={createIRowDataModule}
          getPresentationData={dataViewPresentation}
          token={token}
          getToken={refreshToken}
          entityName="Module"
        />
      )}
    </>
  );
};

export { PreviewModule };
