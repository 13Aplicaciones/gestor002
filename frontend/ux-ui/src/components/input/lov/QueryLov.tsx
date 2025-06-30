import { MenuTableRefresh } from "../../../ConstantsPresentation";
import { GenericQuery } from "../../form/GenericQuery";
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
  presentations = {
    valueInteger: false,
    valueDecimal: false,
    labelAlternative: false,
  },
}: IQueryLovProps) => {

  /**
   * Configurar las acciones específicas para la tabla de ComboItemes
   */
  const configureLovTableActions = (
    tableFormat: IPresentationTable,
    onSeeRow?: (row: IRowDataLov) => void
  ) => {
    if (tableFormat.items[0]) {
      tableFormat.items[0].onAction = {
        onAction: (row: IRowDataLov) => {
          if (onSeeRow) {
            console.log("onSeeRow", row);
            onSeeRow(row);
          }
        },
      };
    }

    return tableFormat;
  };

  /**
   * Filtrar la presentación de la tabla de Lov según las opciones seleccionadas.
   * 
   * @returns 
   */
  const filterTableQueryLov = () => {
    let modifiedTableQueryLov: IPresentationTable = tableQueryLov();

    if (!presentations.valueInteger && modifiedTableQueryLov.items) {
      modifiedTableQueryLov = {
        ...modifiedTableQueryLov,
        items: modifiedTableQueryLov.items.filter(
          (item) => item.name !== "value"
        ),
      };
    }

    if (!presentations.valueDecimal && modifiedTableQueryLov.items) {
      modifiedTableQueryLov = {
        ...modifiedTableQueryLov,
        items: modifiedTableQueryLov.items.filter(
          (item) => item.name !== "doubleValue"
        ),
      };
    }

    if (!presentations.labelAlternative && modifiedTableQueryLov.items) {
      modifiedTableQueryLov = {
        ...modifiedTableQueryLov,
        items: modifiedTableQueryLov.items.filter(
          (item) => item.name !== "labelAlternative"
        ),
      };
    }

    return modifiedTableQueryLov;
  };


  const jkjk = () => {


    return (

      <QueryFormLov
        onFind={onSeeRow}
        presentations={presentations}
      />
    );

  }

  return (
    <GenericQuery<IRowDataLov>
      apiUrl={apiUrlLov}
      configureTableActions={configureLovTableActions}
      getTablePresentation={filterTableQueryLov}
      getToken={getToken}
      initialParameters={{}}
      menuTableRefresh={MenuTableRefresh.none}
      onCreateRow={onCreateRow}
      onEditRow={onEditRow}
      onSeeRow={onSeeRow}
      QueryForm={jkjk}
      token={token}
    />
  );
};

export { QueryLov };
