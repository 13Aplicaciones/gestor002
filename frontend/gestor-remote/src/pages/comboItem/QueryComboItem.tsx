import { IconButton, Tooltip } from "@radix-ui/themes";
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
import { useTranslation } from "react-i18next";
import {
  GenericQuery,
  IconComponent,
  IPresentationTable,
  IQueryProps,
} from "ux-ui";
import { MenuTableRefresh } from "ux-ui/src/ConstantsPresentation";
import { Menus, MODULE } from "../../utils/Constants";
import { tableQueryModule } from "../comboItem/structures/Presentations";
import { IRowDataComboItem } from "../comboItem/structures/Types";
import { QueryFormComboItem } from "./QueryFormComboItem";
import QueryActionsComboItem from "./QueryActionsComboItem";

/**
 * Tabla de ComboItemes del sistema.
 */
const QueryComboItem = ({ onEditRow, onSeeRow, onCreateRow }: IQueryProps) => {
  const [apiUrl, setApiUrl] = useState("");
  const [token, setToken] = useState<string | undefined>(undefined);
  const [t] = useTranslation("global_gestor");
  const [refreshKey, setRefreshKey] = useState(0);


  /**
   * Inicializar token y parámetros de URL
   */
  useEffect(() => {
    const initializeStructure = async () => {
      const tokenTemp: ITokenRoot = await getToken();
      setToken(tokenTemp.access_token);

      const parameter: IParameter = await getParameter(MODULE, "200");
      setApiUrl(
        parameter.valueText01 + Menus.COMBO_ITEM_ENDPOINT + "/paginated"
      );
    };

    initializeStructure();
  }, []);

  /**
   * Configurar las acciones específicas para la tabla de ComboItemes
   */
  const configureComboItemTableActions = (
    tableFormat: IPresentationTable,
    onEditRow?: (row: IRowDataComboItem) => void,
    onSeeRow?: (row: IRowDataComboItem) => void
  ) => {
    // Configurar acción para ver detalle
    if (tableFormat.items[1]) {
      tableFormat.items[1].onAction = {
        onAction: (row: IRowDataComboItem) => {
          if (onSeeRow) {
            onSeeRow(row);
          }
        },
      };
    }

    // Configurar acción de edición
    if (tableFormat.items[7]) {
      tableFormat.items[7].component = (row: IRowDataComboItem) => (
        <QueryActionsComboItem
          row={row}
          onEditRow={(row: IRowDataComboItem) => {
            if (onEditRow) {
              onEditRow(row);
            }
          }}
          onRefresh={() => setRefreshKey(prev => prev + 1)}
        />
      );
    }

    return tableFormat;
  };

  /**
   * Configurar el menú de la tabla de ComboItemes
   *
   */
  const MenuTable = () => {
    return (
      <Tooltip content={t("modules." + Menus.ComboItem + ".add")} side="left">
        <IconButton variant="soft" onClick={onCreateRow}>
          <IconComponent iconName="PlusIcon" width="16" height="16" />
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <GenericQuery<IRowDataComboItem>
      apiUrl={apiUrl}
      childrenMenu={<MenuTable />}
      configureTableActions={configureComboItemTableActions}
      getTablePresentation={tableQueryModule}
      getToken={refreshToken}
      initialParameters={{
        indexComboItem: "",
        message: "",
        refreshKey: refreshKey,
      }}
      menuTableRefresh={MenuTableRefresh.refresh}
      onCreateRow={onCreateRow}
      onEditRow={onEditRow}
      onSeeRow={onSeeRow}
      QueryForm={QueryFormComboItem}
      token={token}
    />
  );
};

export { QueryComboItem };
