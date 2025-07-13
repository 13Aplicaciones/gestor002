/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Heading } from "@radix-ui/themes";
import { ComponentType, useState } from "react";
import { useTranslation } from "react-i18next";
import { StatusEdit } from "../../ConstantsPresentation";
import { ToastContextProvider } from "../toast/ToastContextProvider";
import { IFormProps, IQueryProps, IWorkProps } from "./Types";

/**
 * Página Crud para manejar operaciones de creación, edición, visualización y consulta de datos.
 *
 * Este componente es genérico y facila para un header o detail, y para este ultimo caso se usa atributos iniciales en el row en initialRow.
 * Se sugiere no usar el WorkPanel en casos de detail para simpliricar la implementación.
 *
 * @param tranlation - Traducción del módulo.
 * @param createIRowDataCustom - Función para crear una fila personalizada.
 * @param QueryPanel - Componente de consulta.
 * @param FormPanel - Componente de edición de formulario.
 * @param WorkPanel - Componente de vista previa para usar en procesamientos puntuales como una impresion o exportación de datos etc.
 * @param initialRow - Fila inicial se usa en caso de detail y se necesita atributos iniciales en el row.
 *
 * @returns Componente de página CRUD.
 *
 */
interface PageCrudInnerProps {
  tranlation: string;
  createIRowDataCustom: () => any;
  QueryPanel: ComponentType<IQueryProps>;
  FormPanel: ComponentType<IFormProps>;
  WorkPanel?: ComponentType<IWorkProps>;
  initialRow?: any;
}
/**
 * Componente interno de PageCrud que maneja la lógica de creación, edición, visualización y consulta de datos.
 *
 * @param PageCrudInnerProps - Propiedades del componente.
 * @returns
 */
const PageCrudInnerComponent = ({
  tranlation,
  createIRowDataCustom,
  QueryPanel,
  FormPanel,
  WorkPanel,
  initialRow,
}: PageCrudInnerProps) => {
  const [rowSelecionado, setRowSelecionado] = useState<any>(
    createIRowDataCustom()
  );
  const [status, setStatus] = useState(StatusEdit.find);
  const [t] = useTranslation("global_gestor");

  /**
   * Funcion para editar una fila.
   *
   * @param row
   */
  const onEditarRow = (row: any) => {
    setStatus(StatusEdit.edit);
    setRowSelecionado(row);
  };

  /**
   * Funcion para ver una fila.
   *
   * @param row
   */
  const onSeeRow = (row: any) => {
    setStatus(StatusEdit.see);
    setRowSelecionado(row);
  };

  /**
   * Funcion para crear una fila.
   *
   */
  const onCreateRow = () => {
    setStatus(StatusEdit.create);
    setRowSelecionado(createIRowDataCustom());
  };

  /**
   * Funcion para volver a la vista previa.
   *
   */
  const onBackWork = () => {
    setStatus(StatusEdit.find);
  };

  return (
    <ToastContextProvider>
      <Flex direction="column" gap="2" p="2">
        <Flex maxWidth="60vw">
          <Heading size="3">
            {t("modules." + tranlation + ".panel.find")}
          </Heading>
        </Flex>

        {status == StatusEdit.find && (
          <QueryPanel
            onEditRow={onEditarRow}
            onSeeRow={onSeeRow}
            onCreateRow={onCreateRow}
            initialRow={initialRow}
          />
        )}

        {status == StatusEdit.see && WorkPanel && (
          <WorkPanel row={rowSelecionado} onBack={onBackWork} />
        )}

        {(status == StatusEdit.create || status == StatusEdit.edit) && (
          <FormPanel
            status={status}
            row={rowSelecionado}
            onBack={() => {
              setStatus(StatusEdit.find);
            }}
            initialRow={initialRow}
          />
        )}
      </Flex>
    </ToastContextProvider>
  );
};

/**
 * Componente de página CRUD.
 *
 * @param PageCrudInnerProps - Propiedades del componente.
 * @returns
 */
const PageCrud = ({
  tranlation,
  createIRowDataCustom,
  QueryPanel,
  FormPanel,
  WorkPanel,
  initialRow,
}: PageCrudInnerProps) => {
  return (
    <PageCrudInnerComponent
      tranlation={tranlation}
      createIRowDataCustom={createIRowDataCustom}
      QueryPanel={QueryPanel}
      FormPanel={FormPanel}
      WorkPanel={WorkPanel}
      initialRow={initialRow}
    />
  );
};

export { PageCrud };
