/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Heading } from "@radix-ui/themes";
import { ComponentType, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { StatusEdit } from "../../ConstantsPresentation";
import { ToastContextProvider } from "../toast/ToastContextProvider";
import { IFormProps, IPreviewProps, IQueryProps } from "./Types";

/**
 * Página Crud Basica del sistema.
 *
 * @param tranlation - Traducción del módulo.
 * @param createIRowDataCustom - Función para crear una fila personalizada.
 * @param QueryPanel - Componente de consulta.
 * @param PreviewPanel - Componente de vista previa.
 * @param FormPanel - Componente de edición de formulario.
 * @param MasterPreviewPanel - Componente de vista previa maestro.
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
  MasterPreviewPanel,
  initialRow,
}: {
  tranlation: string;
  createIRowDataCustom: () => any;
  QueryPanel: ComponentType<IQueryProps>;
  FormPanel: ComponentType<IFormProps>;
  PreviewPanel: ComponentType<IPreviewProps>;
  MasterPreviewPanel?: ComponentType<IPreviewProps>;
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

            {status == StatusEdit.see && (
              <PreviewPanel row={rowSelecionado} onBack={onBackPreview} />
            )}

            {status == StatusEdit.detail && MasterPreviewPanel && (
              <MasterPreviewPanel row={rowSelecionado} onBack={onBackPreview} />
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
    MasterPreviewPanel,
  ]); // El componente interno se recrea solo cuando cambian las dependencias

  // Renderizar el componente interno
  return <PageCrudInstance />;
};

export { PageCrud };
