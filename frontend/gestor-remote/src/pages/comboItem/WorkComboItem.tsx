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
import { dataViewPresentation } from "../comboItem/structures/Presentations";
import { createIRowDataComboItem, IRowDataComboItem } from "../comboItem/structures/Types";

/**
 * Función para tener una vista previa de los ComboItemes del sistema.
 */
const WorkComboItem = ({
  onBack,
  row,
}: {
  onBack: () => void;
  row?: IRowDataComboItem;
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
        const url = `${param.valueText01}${Menus.COMBO_ITEM_ENDPOINT}/${row.uuid}`;
        setApiUrl(url);
      } catch (error) {
        console.error("WorkComboItem -> Error:", error);  
        setApiUrl("");
      }
    })();
  }, [row]);

  return (
    <>
      {!apiUrl || !token ? (
        <></>
      ) : (
        <GenericWork<IRowDataComboItem>
          apiUrl={apiUrl}
          createEmptyData={createIRowDataComboItem}
          getPresentationData={dataViewPresentation}
          token={token}
          row={row}
          getToken={refreshToken}
          entityName="ComboItem"
          onBack={() => onBack()}
        />
      )}
    </>
  );
};

export { WorkComboItem };
