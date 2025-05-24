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
  createIRowDataInformation,
  IRowDataInformation,
} from "./Structures/Types";

const PreviewInformation = ({onBack, row }: { onBack: () => void; row?: IRowDataInformation }) => {
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
        const url = `${param.valueText01}${Menus.INFORMATION_ENDPOINT}/${row.uuid}`;
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
        <GenericPreview<IRowDataInformation>
          apiUrl={apiUrl}
          createEmptyData={createIRowDataInformation}
          getPresentationData={dataViewPresentation}
          token={token}
          getToken={refreshToken}
          entityName="Information"
          onBack={onBack}
        />
      )}
    </>
  );
};

export { PreviewInformation };
