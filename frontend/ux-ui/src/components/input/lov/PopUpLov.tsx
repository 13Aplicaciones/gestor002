/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex } from "@radix-ui/themes";
import { ComponentType, useState } from "react";
import { useTranslation } from "react-i18next";
import { DialogForm } from "../../dialog/DialogState";
import { ToastContextProvider } from "../../toast/ToastContextProvider";

/**
 * Interfaz para el Query Lov.
 */
interface IQueryLovProps {
  apiUrlLov: string;
  getToken: () => Promise<any>;
  onCreateRow: () => void;
  onEditRow: (row: any) => void;
  onSeeRow: (row: any) => void;
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
  onSelectRow: (row: any) => void;
  onCancel: () => void;
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
 * @param visible - Indica si el panel está visible.
 * @returns
 */
const PageLovInnerComponent = ({
  apiUrlLov,
  createIRowDataCustom,
  getToken,
  initialRow,
  onCancel,
  onSelectRow,
  QueryLovPanel,
  token,
  visible = true,
}: PageLovInnerProps) => {
  const [setRowSelecionado] = useState<any>(createIRowDataCustom());

  /**
   * Funcion para editar una fila.
   *
   * @param row
   */
  const onEditarRow = (row: any) => {
    setRowSelecionado(row);
    onSelectRow(row);
  };

  /**
   * Funcion para ver una fila.
   *
   * @param row
   */
  const onSeeRow = (row: any) => {
    setRowSelecionado(row);
    onSelectRow(row);
  };

  /**
   * Funcion para crear una fila.
   *
   */
  const onCreateRow = () => {
    setRowSelecionado(createIRowDataCustom());
  };

  const [t] = useTranslation("global_ux");

  return (
    <DialogForm
      status={visible}
      title={t("lov.title")}
      cancel={false}
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
            onEditRow={onEditarRow}
            onSeeRow={onSeeRow}
            token={token}
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
  onSelectRow,
  QueryLovPanel,
  token,
  visible = true,
}: PageLovInnerProps) => {
  return (
    <PageLovInnerComponent
      apiUrlLov={apiUrlLov}
      createIRowDataCustom={createIRowDataCustom}
      getToken={getToken}
      initialRow={initialRow}
      onCancel={onCancel}
      onSelectRow={onSelectRow}
      QueryLovPanel={QueryLovPanel}
      token={token}
      visible={visible}
    />
  );
};

export { PopUpLov };
export type { PageLovInnerProps, IQueryLovProps };
