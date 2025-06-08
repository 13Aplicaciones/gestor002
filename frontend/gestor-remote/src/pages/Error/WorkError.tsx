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
import { GenericWork } from "ux-ui";
import { Menus, MODULE } from "../../utils/Constants";
import { dataViewPresentation } from "./Structures/Presentations";
import { createIRowDataError, IRowDataError } from "./Structures/Types";

/**
 * Función para tener una vista previa de los errores del sistema.
 */
const WorkError = ({
  onBack,
  row,
}: {
  onBack: () => void;
  row?: IRowDataError;
}) => {
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
        const url = `${param.valueText01}${Menus.ERROR_ENDPOINT}/${row.uuid}`;
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
        <GenericWork<IRowDataError>
          apiUrl={apiUrl}
          createEmptyData={createIRowDataError}
          getPresentationData={dataViewPresentation}
          token={token}
          row={row}
          getToken={refreshToken}
          entityName="Error"
          onBack={() => onBack()}
        />
      )}
    </>
  );
};

export { WorkError };
