/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Heading, Separator } from "@radix-ui/themes";
import { ComponentType, useState } from "react";
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
}: {
  tranlation: string;
  createIRowDataCustom: () => any;
  QueryPanel: ComponentType<IQueryProps>;
  FormPanel: ComponentType<IFormProps>;
  PreviewPanel: ComponentType<IPreviewProps>;
  MasterPreviewPanel?: ComponentType<IPreviewProps>;
}) => {
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

  const onCreateRow = () => {
    setStatus(StatusEdit.create);
    setRowSelecionado(createIRowDataCustom());
  };

  const onBackPreview = () => {
    setStatus(StatusEdit.find);
  }

  return (
    <ToastContextProvider>
      <Flex direction="column" gap="2" p="2">
        <Separator orientation="horizontal" size="4" />
        <Flex maxWidth="60vw">
          <Heading size="2">
            {t("modules." + tranlation + ".panel." + status)}
          </Heading>
        </Flex>

        {status == StatusEdit.find && (
          <QueryPanel
            onEditRow={onEditarRow}
            onSeeRow={onSeeRow}
            onCreateRow={onCreateRow}
          />
        )}

        {status == StatusEdit.see && <PreviewPanel row={rowSelecionado} onBack={onBackPreview} />}

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
          />
        )}       
      </Flex>
    </ToastContextProvider>
  );
};

export { PageCrud };
