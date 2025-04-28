import { Button } from "@radix-ui/themes";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { IQueryProps } from "ux-ui/src/components/crud/Types";
import { Menus } from "../../utils/Constants";
import { QueryFormInformation } from "./QueryFormInformation";
import { tableQueryInformation } from "./Structures/Presentations";
import { IRowDataInformation } from "./Structures/Types";
import { IPresentationTable } from "ux-ui";
import { GenericQuery } from "../../components/forms/GenericQuery";

/**
 * Tabla de información del sistema.
 */
const QueryInformation = ({ onEditRow, onSeeRow }: IQueryProps) => {
  /**
   * Configurar las acciones específicas para la tabla de información
   */
  const configureInformationTableActions = (
    tableFormat: IPresentationTable,
    onEditRow?: (row: IRowDataInformation) => void,
    onSeeRow?: (row: IRowDataInformation) => void
  ) => {
    // Configurar acción para ver detalle
    if (tableFormat.items[1]) {
      tableFormat.items[1].onAction = {
        onAction: (row: IRowDataInformation) => {
          if (onSeeRow) {
            onSeeRow(row);
          }
        },
      };
    }

    // Configurar acción de edición
    if (tableFormat.items[3]) {
      tableFormat.items[3].component = (row: IRowDataInformation) => (
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
    <GenericQuery<IRowDataInformation>
      QueryForm={QueryFormInformation}
      endpoint={Menus.INFORMATION_ENDPOINT}
      getTablePresentation={tableQueryInformation}
      initialParameters={{
        size: "10",
        name: ""
      }}
      configureTableActions={configureInformationTableActions}
      onEditRow={onEditRow}
      onSeeRow={onSeeRow}
    />
  );
};

export { QueryInformation };