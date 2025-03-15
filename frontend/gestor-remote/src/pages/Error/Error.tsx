import { ButtonBackFloating, ButtonCreateRecordFloating } from "ux-ui";
import { createIRowDataError, IRowDataError } from "./Types";
import { Flex, Heading, Separator } from "@radix-ui/themes";
import { OriginProps } from "../Origin";
import { Query } from "./Query";
import { StatusEdit } from "ux-ui";
import { useState } from "react";
import { VistaPrevia } from "./Preview";
import ErrorEdit from "./Edit";

//TODO tiene el valor de la estructura para cambiar los valores de permisos
const Error = ({ structure }: { structure?: OriginProps }) => {
  const [status, setStatus] = useState(StatusEdit.find);
  const [rowSelecionado, setRowSelecionado] = useState<IRowDataError>(
    createIRowDataError()
  );

  const onEditarRow = (row: IRowDataError) => {
    setStatus(StatusEdit.edit);
    setRowSelecionado(row);
  };

  const onSeeRow = (row: IRowDataError) => {
    setStatus(StatusEdit.see);
    setRowSelecionado(row);
  };

  return (
    <Flex direction="column" gap="2" p="2">
      <Separator orientation="horizontal" size="4" />

      <Flex maxWidth="60vw">
        <Heading size="4" wrap="pretty">
          {status}
        </Heading>
      </Flex>

      {status == StatusEdit.find && (
        <Query onEditRow={onEditarRow} onSeeRow={onSeeRow} />
      )}

      {status == StatusEdit.see && <VistaPrevia index={rowSelecionado.index} />}

      {(status == StatusEdit.create || status == StatusEdit.edit) && (
        <ErrorEdit
          status={status}
          row={rowSelecionado}
          onAtras={() => {
            setStatus(StatusEdit.find);
          }}
        />
      )}

      {(status == StatusEdit.find && (
        <ButtonCreateRecordFloating
          toolTip="Error"
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
  );
};

export default Error;
