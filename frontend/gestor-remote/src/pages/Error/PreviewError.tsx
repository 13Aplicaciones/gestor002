import {
  getParameter,
  IParameter,
} from "orchestrator_remote/service/Parameter";
import { getToken, ITokenRoot } from "orchestrator_remote/service/Tokens";
import { useEffect, useState } from "react";
import { GenericPreview } from "../../components/forms/GenericPreview";
import { Menus, MODULE } from "../../utils/Constants";
import { dataViewPresentation } from "./Structures/Presentations";
import { createIRowDataError, IRowDataError } from "./Structures/Types";

/**
 * Función para tener una vista previa de los errores del sistema.
 */
const PreviewError = ({ row }: { row?: IRowDataError }) => {
  const [apiUrl, setApiUrl] = useState("");
  const [token, setToken] = useState<string | undefined>(undefined);

  /**
   * Inicializar token y parámetros de URL
   */
  useEffect(() => {
    const initializeStructure = async () => {
      const tokenTemp: ITokenRoot = await getToken();
      setToken(tokenTemp.access_token);

      const parameter: IParameter = await getParameter(MODULE, "200");
      setApiUrl(parameter.valueText01 + Menus.ERROR_ENDPOINT + "/" + row?.uuid);
    };

    initializeStructure();
  }, [row]);

  return (
    <GenericPreview<IRowDataError>
      apiUrl={apiUrl}
      createEmptyData={createIRowDataError}
      getPresentationData={dataViewPresentation}
      token={token}
      getToken={getToken}
      entityName="Error"
    />
  );
};

export { PreviewError };
