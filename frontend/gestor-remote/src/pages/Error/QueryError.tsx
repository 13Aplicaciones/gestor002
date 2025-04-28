import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { IQueryProps } from "ux-ui/src/components/crud/Types";
import { Menus } from "../../utils/Constants";
import { QueryFormError } from "./QueryFormError";
import { tableQueryModule } from "./Structures/Presentations";
import { IRowDataError } from "./Structures/Types";
import { IPresentationTable } from "ux-ui";
import { GenericQuery } from "../../components/forms/GenericQuery";

/**
 * Tabla de errores del sistema.
 */
const QueryError = ({ onEditRow, onSeeRow }: IQueryProps) => {
  /**
   * Configurar las acciones específicas para la tabla de errores
   */
  const configureErrorTableActions = (
    tableFormat: IPresentationTable,
    onEditRow?: (row: IRowDataError) => void,
    onSeeRow?: (row: IRowDataError) => void
  ) => {
    // Configurar acción para ver detalle
    if (tableFormat.items[1]) {
      tableFormat.items[1].onAction = {
        onAction: (row: IRowDataError) => {
          if (onSeeRow) {
            onSeeRow(row);
          }
        },
      };
    }

    // Configurar acción de edición
    if (tableFormat.items[4]) {
      tableFormat.items[4].component = (row: IRowDataError) => (
        <Button
          size="1"
          variant="ghost"
          onClick={() => {
            if (onEditRow) {
              onEditRow(row);
            }
          }}
        >
          <DotsVerticalIcon width="16" height="16" />
        </Button>
      );
    }

    return tableFormat;
  };

  return (
    <GenericQuery<IRowDataError>
      QueryForm={QueryFormError}
      endpoint={Menus.ERROR_ENDPOINT}
      getTablePresentation={tableQueryModule}
      initialParameters={{
        size: "10",
        indexError: "",
        message: ""
      }}
      configureTableActions={configureErrorTableActions}
      onEditRow={onEditRow}
      onSeeRow={onSeeRow}
    />
  );
};

export { QueryError };