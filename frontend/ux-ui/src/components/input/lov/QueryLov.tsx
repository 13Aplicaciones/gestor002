import { IconButton } from "@radix-ui/themes";
import { MenuTableRefresh } from "../../../ConstantsPresentation";
import { GenericQuery } from "../../form/GenericQuery";
import { IconComponent } from "../../icon/IconDynamic";
import { IPresentationTable } from "../../table/Table";
import { IQueryLovProps } from "./PopUpLov";
import { QueryFormLov } from "./QueryFormLov";
import { tableQueryLov } from "./structure/Presentations";
import { IRowDataLov } from "./structure/Types";

/**
 * Componente QueryLov para manejar la consulta de ComboItemes.
 *
 * @param onEditRow - Callback para editar una fila.
 * @param onSeeRow - Callback para ver los detalles de una fila.
 * @param onCreateRow - Callback para crear una nueva fila.
 * @param getToken - Función para obtener el token de autenticación.
 * @param token - Token de autenticación.
 * @param apiUrlLov - URL de la API para consultar los datos de Lov.
 *
 * @returns
 */
const QueryLov = ({
  onEditRow,
  onSeeRow,
  onCreateRow,
  getToken,
  token,
  apiUrlLov,
}: IQueryLovProps) => {
  /**
   * Configurar las acciones específicas para la tabla de ComboItemes
   */
  const configureLovTableActions = (
    tableFormat: IPresentationTable,
    onEditRow?: (row: IRowDataLov) => void,
    onSeeRow?: (row: IRowDataLov) => void
  ) => {
    // Configurar acción para ver detalle
    if (tableFormat.items[1]) {
      tableFormat.items[1].onAction = {
        onAction: (row: IRowDataLov) => {
          if (onSeeRow) {
            onSeeRow(row);
          }
        },
      };
    }

    // Configurar acción de edición
    if (tableFormat.items[4]) {
      tableFormat.items[4].component = (row: IRowDataLov) => (
        <IconButton
          variant="ghost"
          size="1"
          onClick={() => {
            if (onEditRow) {
              onEditRow(row);
            }
          }}
        >
          <IconComponent iconName="DotsVerticalIcon" width="16" height="16" />
        </IconButton>
      );
    }

    return tableFormat;
  };

  return (
    <GenericQuery<IRowDataLov>
      apiUrl={apiUrlLov}
      configureTableActions={configureLovTableActions}
      getTablePresentation={tableQueryLov}
      getToken={getToken}
      initialParameters={{}}
      menuTableRefresh={MenuTableRefresh.refresh}
      onCreateRow={onCreateRow}
      onEditRow={onEditRow}
      onSeeRow={onSeeRow}
      QueryForm={QueryFormLov}
      token={token}
    />
  );
};

export { QueryLov };
