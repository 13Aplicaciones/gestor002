import { useEffect, useState } from "react";
import { GenericPreview } from "../../components/forms/GenericPreview";
import { Menus, MODULE } from "../../utils/Constants";
import { dataViewPresentation } from "./Structures/Presentations";
import {
  createIRowDataInformation,
  IRowDataInformation,
} from "./Structures/Types";
import { getToken, ITokenRoot } from "orchestrator_remote/service/Tokens";
import {
  getParameter,
  IParameter,
} from "orchestrator_remote/service/Parameter";

/**
 * Función para tener una vista previa de la Información del sistema.
 */
const PreviewInformation = ({ row }: { row?: IRowDataInformation }) => {
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
      setApiUrl(
        parameter.valueText01 + Menus.INFORMATION_ENDPOINT + "/" + row?.uuid
      );
    };

    initializeStructure();
  }, [row]);

  return (
    <GenericPreview<IRowDataInformation>
      apiUrl={apiUrl}
      createEmptyData={createIRowDataInformation}
      getPresentationData={dataViewPresentation}
      token={token}
      getToken={getToken}
      entityName="Information"
    />
  );
};

export { PreviewInformation };
