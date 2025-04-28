import { IPresentationTable } from "ux-ui";
import { IQueryProps } from "ux-ui/src/components/crud/Types";
import { GenericQuery } from "../../components/forms/GenericQuery";
import { Menus } from "../../utils/Constants";
import queryActionsModule from "./QueryActionsModule";
import { QueryFormModule } from "./QueryFormModule";
import { tableQueryModule } from "./Structures/Presentations";
import { IRowDataModule } from "./Structures/Types";

/**
 * Tabla de Modules del sistema.
 */
const QueryModule = ({ onEditRow, onSeeRow }: IQueryProps) => {
  /**
   * Configurar las acciones específicas para la tabla de Modules
   */
  const configureModuleTableActions = async (
    tableFormat: IPresentationTable,
    onEditRow?: (row: IRowDataModule) => void,
    onSeeRow?: (row: IRowDataModule) => void
  ) => {
    // Configurar acción para ver detalle
    if (tableFormat.items[1]) {
      tableFormat.items[1].onAction = {
        onAction: (row: IRowDataModule) => {
          if (onSeeRow) {
            onSeeRow(row);
          }
        },
      };
    }

    // Configurar acciones personalizadas
    if (tableFormat.items[5]) {
      tableFormat.items[5].component = (row) =>
        queryActionsModule({
          row,
          onEditRow: (row) => {
            if (onEditRow) {
              onEditRow(row);
            }
          },
        });
    }

    return tableFormat;
  };

  return (
    <GenericQuery<IRowDataModule>
      QueryForm={QueryFormModule}
      endpoint={Menus.MODULE_ENDPOINT}
      getTablePresentation={tableQueryModule}
      initialParameters={{
        size: "10",
        indexModule: "",
        name: "",
        status: ""
      }}
      configureTableActions={configureModuleTableActions}
      onEditRow={onEditRow}
      onSeeRow={onSeeRow}
    />
  );
};

export { QueryModule };
