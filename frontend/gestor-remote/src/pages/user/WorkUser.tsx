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
import { dataViewPresentation } from "./structures/Presentations";
import { createIRowDataUser, IRowDataUser } from "./structures/Types";

/**
 * Componente para la gestión de usuarios en el sistema.
 *
 * @param { onBack, row } - Propiedades del componente
 * @returns
 */
const WorkUser = ({
  onBack,
  row,
}: {
  onBack: () => void;
  row?: IRowDataUser;
}) => {
  const [token, setToken] = useState<string>();
  const [apiUrl, setApiUrl] = useState<string>();

  /**
   * Inicializar token y parámetros de URL
   */
  useEffect(() => {
    getToken()
      .then((t: ITokenRoot) => setToken(t.access_token))
      .catch(console.error);
  }, []);

  /**
   * Generar la URL de la API para el usuario seleccionado
   * @param {IRowDataUser} row - Datos del usuario seleccionado
   */
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
        <GenericWork<IRowDataUser>
          apiUrl={apiUrl}
          createEmptyData={createIRowDataUser}
          getPresentationData={dataViewPresentation}
          token={token}
          row={row}
          getToken={refreshToken}
          entityName="User"
          onBack={() => onBack()}
        />
      )}
    </>
  );
};

export { WorkUser };
