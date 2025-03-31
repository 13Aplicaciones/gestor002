import { ButtonBackFloating, ButtonCreateRecordFloating, ToastContextProvider } from "ux-ui";
import { createIRowDataError, IRowDataError } from "./Types";
import { Flex, Heading, Separator } from "@radix-ui/themes";
import { Preview } from "./Preview";
import { Query } from "./Query";
import { StatusEdit } from "ux-ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import FormEdit from "./FormEdit";

/**
 * Página de errores del sistema.
 *
 * @author @omargo33
 *
 * @param structure Estructura de la pagina de errores del sistema.
 * @returns
 */
const Page = () => {
  const [t] = useTranslation("global_gestor");
  const [status, setStatus] = useState(StatusEdit.find);
  const [rowSelecionado, setRowSelecionado] = useState<IRowDataError>(
    createIRowDataError()
  );

  /**
   * Funcion para editar una fila.
   *
   * @param row
   */
  const onEditarRow = (row: IRowDataError) => {
    setStatus(StatusEdit.edit);
    setRowSelecionado(row);
  };

  /**
   * Funcion para ver una fila.
   *
   * @param row
   */
  const onSeeRow = (row: IRowDataError) => {
    setStatus(StatusEdit.see);
    setRowSelecionado(row);
  };

  return (
    <ToastContextProvider>
      <Flex direction="column" gap="2" p="2">
        <Separator orientation="horizontal" size="4" />
        <Flex maxWidth="60vw">
          <Heading size="4" wrap="pretty">
            {t("modules.GS-ER-001.panel." + status)}
          </Heading>
        </Flex>

        {status == StatusEdit.find && (
          <Query onEditRow={onEditarRow} onSeeRow={onSeeRow} />
        )}

        {status == StatusEdit.see && (
          <Preview index={rowSelecionado.indexError} />
        )}

        {(status == StatusEdit.create || status == StatusEdit.edit) && (
          <FormEdit
            status={status}
            row={rowSelecionado}
            onAtras={() => {
              setStatus(StatusEdit.find);
            }}
          />
        )}

        {(status == StatusEdit.find && (
          <ButtonCreateRecordFloating
            toolTip={t("modules.GS-ER-001.add")}
            onClick={() => {
              setStatus(StatusEdit.create);
              setRowSelecionado(createIRowDataError());
            }}
          />
        )) || (
            <ButtonBackFloating
              onClick={() => {
                setStatus(StatusEdit.find);
              }}
            />
          )}
      </Flex>
    </ToastContextProvider>
  );
};

export { Page };
