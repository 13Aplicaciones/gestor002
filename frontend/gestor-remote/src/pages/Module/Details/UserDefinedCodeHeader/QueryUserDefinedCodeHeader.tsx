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
  GenericQuery,
  IconComponent,
  IPresentationTable,
  IQueryProps,
} from "ux-ui";
import { Menus, MODULE } from "../../../../utils/Constants";
import { QueryFormUserDefinedCodeHeader } from "./QueryFormUserDefinedCodeHeader";
import { tableQueryUserDefinedCodeHeader } from "./Structures/Presentations";
import { IRowDataUserDefinedCodeHeader } from "./Structures/Types";
import { IconButton, Tooltip } from "@radix-ui/themes";
import { MenuTableRefresh } from "ux-ui/src/ConstantsPresentation";
import { useTranslation } from "react-i18next";

/**
 * Tabla de información del sistema.
 */
const QueryUserDefinedCodeHeader = ({
  onEditRow,
  onSeeRow,
  onCreateRow,
  initialRow,
}: IQueryProps) => {
  const [apiUrl, setApiUrl] = useState("");
  const [token, setToken] = useState<string | undefined>(undefined);
  const [t] = useTranslation("global_gestor");

  /**
   * Inicializar token y parámetros de URL
   */
  useEffect(() => {
    const initializeStructure = async () => {
      const tokenTemp: ITokenRoot = await getToken();
      setToken(tokenTemp.access_token);

      const parameter: IParameter = await getParameter(MODULE, "200");
      setApiUrl(parameter.valueText01 + Menus.USER_ENDPOINT + "/paginated");
    };

    initializeStructure();
  }, []);

  /**
   * Configurar las acciones específicas para la tabla de información
   */
  const configureUserDefinedCodeHeaderTableActions = (
    tableFormat: IPresentationTable,
    //onEditRow?: (row: IRowDataUserDefinedCodeHeader) => void,
    onSeeRow?: (row: IRowDataUserDefinedCodeHeader) => void
  ) => {
    // Configurar acción para ver detalle
    if (tableFormat.items[0]) {
      tableFormat.items[0].onAction = {
        onAction: (row: IRowDataUserDefinedCodeHeader) => {
          if (onSeeRow) {
            onSeeRow(row);
          }
        },
      };
    }

    return tableFormat;
  };

  /**
   * Configurar el menú de la tabla de errores
   *
   */
  const MenuTable = () => {
    return (
      <Tooltip content={t("modules." + Menus.USER_DEFINED_CODE_HEADER + ".add")} side="left">
        <IconButton variant="soft" onClick={onCreateRow}>
          <IconComponent iconName="PlusIcon" width="16" height="16" />
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <GenericQuery<IRowDataUserDefinedCodeHeader>
      QueryForm={QueryFormUserDefinedCodeHeader}
      getTablePresentation={tableQueryUserDefinedCodeHeader}
      initialParameters={{
        size: "10",
        name: "",
        uuidModule: initialRow?.uuidModule ?? "",
      }}
      configureTableActions={configureUserDefinedCodeHeaderTableActions}
      apiUrl={apiUrl}
      token={token}
      menuTableRefresh={MenuTableRefresh.refresh}
      childrenMenu={<MenuTable />}
      getToken={refreshToken}
      onEditRow={onEditRow}
      onSeeRow={onSeeRow}
      onCreateRow={onCreateRow}
      initialRow={initialRow}
    />
  );
};

export { QueryUserDefinedCodeHeader };
