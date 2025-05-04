import {
    getParameter,
    IParameter,
} from "orchestrator_remote/service/Parameter";
import { getToken, ITokenRoot, refreshToken } from "orchestrator_remote/service/Tokens";
import { useEffect, useState } from "react";
import { GenericPreview } from "ux-ui";
import { Menus, MODULE } from "../../utils/Constants";
import { dataViewPresentation } from "./Structures/Presentations";
import {
    createIRowDataUser,
    IRowDataUser,
} from "./Structures/Types";
  
  const PreviewUser = ({ row }: { row?: IRowDataUser }) => {
    const [token, setToken] = useState<string>();
    const [apiUrl, setApiUrl] = useState<string>("");
  
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
          const url = `${param.valueText01}${Menus.USER_ENDPOINT}/${row.uuid}`;
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
          <GenericPreview<IRowDataUser>
            apiUrl={apiUrl}
            createEmptyData={createIRowDataUser}
            getPresentationData={dataViewPresentation}
            token={token}
            getToken={refreshToken}
            entityName="User"
          />
        )}
      </>
    );
  };
  
  export { PreviewUser };
  