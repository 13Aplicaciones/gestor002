/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Heading } from "@radix-ui/themes";
import { ComponentType, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { StatusEdit } from "../../ConstantsPresentation";
import { ToastContextProvider } from "../toast/ToastContextProvider";
import { IFormProps, IPreviewProps, IQueryProps } from "./Types";

/**
 * Página Crud para manejar operaciones de creación, edición, visualización y consulta de datos.
 * 
 * Este componente es genérico y facila para un header o detail, y para este ultimo caso se usa atributos iniciales en el row en initialRow.
 * Se sugiere no usar el PreviewPanel en casos de detail para simpliricar la implementación.
 *
 * @param tranlation - Traducción del módulo.
 * @param createIRowDataCustom - Función para crear una fila personalizada.
 * @param QueryPanel - Componente de consulta.
 * @param FormPanel - Componente de edición de formulario.
 * @param PreviewPanel - Componente de vista previa para usar en procesamientos puntuales como una impresion o exportación de datos etc.
 * @param initialRow - Fila inicial se usa en caso de detail y se necesita atributos iniciales en el row.
 *
 * @returns Componente de página CRUD.
 *
 */
const PageCrud = ({
  tranlation,
  createIRowDataCustom,
  QueryPanel,
  FormPanel,
  PreviewPanel,
  initialRow,
}: {
  tranlation: string;
  createIRowDataCustom: () => any;
  QueryPanel: ComponentType<IQueryProps>;
  FormPanel: ComponentType<IFormProps>;
  PreviewPanel?: ComponentType<IPreviewProps>;
  initialRow?: any;
}) => {
  // Crear un componente interno único para cada instanceId
  const PageCrudInstance = useMemo(() => {
    // Este componente interno tendrá su propio estado
    const InnerComponent = () => {
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
      const onBackPreview = () => {
        setStatus(StatusEdit.find);
      };

      return (
        <ToastContextProvider>
          <Flex direction="column" gap="2" p="2">
            <Flex maxWidth="60vw">
              <Heading size="3">
                {t("modules." + tranlation + ".panel." + status)}
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

            {status == StatusEdit.see && PreviewPanel && (
              <PreviewPanel row={rowSelecionado} onBack={onBackPreview} />
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
    return InnerComponent;
  }, [
    tranlation,
    createIRowDataCustom,
    QueryPanel,
    FormPanel,
    PreviewPanel,
    initialRow,
  ]);

  return <PageCrudInstance />;
};

export { PageCrud };
