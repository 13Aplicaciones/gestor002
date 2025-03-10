import { Button, Flex } from "@radix-ui/themes";
import { ButtonCreateRecordFloating } from "ux-ui";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { createIRowDataError, IRowDataError } from "./ErrorTypes";
import { OriginProps } from "../Origin";
import { StatusEdit } from "ux-ui";
import { useEffect, useState } from "react";
import { VistaPrevia } from "./ErroresVistaPrevia";
import ErrorEdit from "./ErroresEdit";
import Tabla from "./QueryError";

const Error = ({ structure }: { structure?: OriginProps }) => {
  const [status, setStatus] = useState(StatusEdit.find);
  const [rowSelecionado, setRowSelecionado] = useState<IRowDataError>(createIRowDataError());

  const onEditarRow = (row: IRowDataError) => {
    setStatus(StatusEdit.edit);
    setRowSelecionado(row);
  };

  useEffect(() => {
    // Actualizar el token.
  }, [structure?.refreshToken]);

  return (
    <Flex direction="column" gap="2">
      {(status==StatusEdit.find) && (
        <Flex direction="column" gap="3" p="3">
          <Tabla onEditar={onEditarRow} />
          <VistaPrevia index="268" />
          <ButtonCreateRecordFloating
            toolTip="Error"
            onClick={() => {
              setStatus(StatusEdit.create);
              setRowSelecionado(createIRowDataError());
            }}
          />
        </Flex>
      )}

      {(status==StatusEdit.create || status==StatusEdit.edit) && (
        <Flex direction="row" justify="between" p="3">
          <Flex direction="column" gap="3">
            <ErrorEdit
              status={status}
              row={rowSelecionado}
              onAtras={() => {
                setStatus(StatusEdit.find);
              }}
            />
          </Flex>
          <Flex gap="3">
            <Button
              onClick={() => {
                setStatus(StatusEdit.find);
              }}>
              <ChevronLeftIcon />
              status
            </Button>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}

export default Error;
