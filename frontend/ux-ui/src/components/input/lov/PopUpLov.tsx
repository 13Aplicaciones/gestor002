/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex } from "@radix-ui/themes";
import { ComponentType, useState } from "react";
import { useTranslation } from "react-i18next";
import { DialogForm } from "../../dialog/DialogState";
import { ToastContextProvider } from "../../toast/ToastContextProvider";
import { DialogSize } from "../../../ConstantsPresentation";

/**
 * Interfaz para el Query Lov.
 */
interface IQueryLovProps {
  apiUrlLov: string;
  getToken: () => Promise<any>;
  onCreateRow?: () => void;
  onEditRow?: (row: any) => void;
  onSeeRow: (row: any) => void;
  presentations: {
    valueInteger: boolean;
    valueDecimal: boolean;
    labelAlternative: boolean;
  };
  token: string | undefined;
  initialRow?: any;
}

/**
 * Página Lov(List of Value) para manejar operaciones de consulta y selección de datos.
 *
 * @param apiUrlLov - URL de la API para consultar los datos.
 * @param createIRowDataCustom - Función para crear una fila de datos personalizada.
 * @param getToken - Función para obtener el token de autenticación.
 * @param QueryLovPanel - Componente para el panel de consulta Lov.
 * @param token - Token de autenticación.
 * @param onSelectRow - Callback para manejar la selección de una fila.
 * @param onCancel - Callback para manejar la cancelación de la operación.
 * @param presentations - Presentaciones de los datos, incluyendo si se deben mostrar valores enteros, decimales y etiquetas alternativas.
 * @param initialRow - Fila inicial para el panel de consulta.
 * @param visible - Indica si el panel está visible.
 *
 */
interface PageLovInnerProps {
  apiUrlLov: string;
  createIRowDataCustom: () => any;
  getToken: () => Promise<any>;
  QueryLovPanel: ComponentType<IQueryLovProps>;
  token: string | undefined;
  onSeeRow: (row: any) => void;
  onCancel: () => void;
  presentations: {
    valueInteger: boolean;
    valueDecimal: boolean;
    labelAlternative: boolean;
  };
  initialRow?: any;
  visible?: boolean;
}

/**
 * Componente interno de PageLov que maneja la lógica de consulta y selección de datos.
 *
 * @param apiUrlLov - URL de la API para consultar los datos.
 * @param createIRowDataCustom - Función para crear una fila de datos personalizada.
 * @param getToken - Función para obtener el token de autenticación.
 * @param initialRow - Fila inicial para el panel de consulta.
 * @param onCancel - Callback para manejar la cancelación de la operación.
 * @param onSelectRow - Callback para manejar la selección de una fila.
 * @param QueryLovPanel - Componente para el panel de consulta Lov.
 * @param token - Token de autenticación.
 * @param presentations - Presentaciones de los datos, incluyendo si se deben mostrar valores enteros, decimales y etiquetas alternativas.
 * @param visible - Indica si el panel está visible.
 * @returns
 */
const PageLovInnerComponent = ({
  apiUrlLov,
  createIRowDataCustom,
  getToken,
  initialRow,
  onCancel,
  onSeeRow,
  QueryLovPanel,
  token,
  presentations = {
    valueInteger: false,
    valueDecimal: false,
    labelAlternative: false,
  },
  visible = true,
}: PageLovInnerProps) => {
  const [setRowSelecionado] = useState<any>(createIRowDataCustom());
  const [t] = useTranslation("global_ux");

  /**
   * Funcion para crear una fila.
   *
   */
  const onCreateRow = () => {
    setRowSelecionado(createIRowDataCustom());
  };

  /**
   * Maneja la selección de una fila y cierra el diálogo
   */
  const handleRowSelection = (row: any) => {
    onSeeRow(row);
    onCancel(); // Cierra el diálogo después de seleccionar
  };

  return (
    <DialogForm
      status={visible}
      title={t("lov.title")}
      cancel={false}
      size={DialogSize.full}
      onClose={() => {
        onCancel();
      }}
    >
      <ToastContextProvider>
        <Flex direction="column" gap="2" p="2">
          <QueryLovPanel
            apiUrlLov={apiUrlLov}
            getToken={getToken}
            initialRow={initialRow}
            onCreateRow={onCreateRow}
            onSeeRow={handleRowSelection}
            token={token}
            presentations={presentations}
          />
        </Flex>
      </ToastContextProvider>
    </DialogForm>
  );
};

/**
 * Página Lov(List of Value) para manejar operaciones de consulta y selección de datos.
 *
 * @param PageLovInnerProps - Propiedades del componente.
 * @returns
 */
const PopUpLov = ({
  apiUrlLov,
  createIRowDataCustom,
  getToken,
  initialRow,
  onCancel,
  onSeeRow,
  QueryLovPanel,
  token,
  visible = true,
  presentations = {
    valueInteger: false,
    valueDecimal: false,
    labelAlternative: false,
  },
}: PageLovInnerProps) => {
  return (
    <PageLovInnerComponent
      apiUrlLov={apiUrlLov}
      createIRowDataCustom={createIRowDataCustom}
      getToken={getToken}
      initialRow={initialRow}
      onCancel={onCancel}
      onSeeRow={onSeeRow}
      QueryLovPanel={QueryLovPanel}
      token={token}
      visible={visible}
      presentations={presentations}
    />
  );
};

export { PopUpLov };
export type { PageLovInnerProps, IQueryLovProps };
