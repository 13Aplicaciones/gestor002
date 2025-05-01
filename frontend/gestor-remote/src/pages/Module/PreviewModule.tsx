import { useEffect, useState } from "react";
import { GenericPreview } from "../../components/forms/GenericPreview";
import { Menus, MODULE } from "../../utils/Constants";
import { dataViewPresentation } from "./Structures/Presentations";
import { createIRowDataModule, IRowDataModule } from "./Structures/Types";
import { getToken, ITokenRoot } from "orchestrator_remote/service/Tokens";
import { getParameter, IParameter } from "orchestrator_remote/service/Parameter";

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
    const initializeStructure = async () => {
      const tokenTemp: ITokenRoot = await getToken();
      setToken(tokenTemp.access_token);

      const parameter: IParameter = await getParameter(MODULE, "200");
      setApiUrl(
        parameter.valueText01 + Menus.MODULE_ENDPOINT + "/" + row?.uuid
      );
    };

    initializeStructure();
  }, [row]);


  return (
    <GenericPreview<IRowDataModule>
      apiUrl={apiUrl}
      createEmptyData={createIRowDataModule}
      getPresentationData={dataViewPresentation}
      token={token}
      getToken={getToken}
      entityName="Module"
    />
  );
};

export { PreviewModule };
