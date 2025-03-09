import { Button, Flex } from "@radix-ui/themes";
import { ButtonCreateRecordFloating } from "ux-ui";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { OriginProps } from "../Origin";
import { StatusEdit } from "ux-ui/src/ConstantsPresentation";
import { useEffect, useState } from "react";
import { VistaPrevia,  IRowDataError } from "./ErroresVistaPrevia";
import ErrorEdit from "./ErroresEdit";
import Tabla from "./Query";

const Error = ({ structure }: { structure?: OriginProps }) => {
  const [estado, setEstado] = useState(StatusEdit.create);
  const [rowSelecionado, setRowSelecionado] = useState<IRowDataError>({
    message: "",
    description: "",
    uuid: "",
    index: "",
    user: "",
    userDate: "",
    userApp: "",
  });

  const onEditarRow = (row: IRowDataError) => {
    setEstado(StatusEdit.edit);
    setRowSelecionado(row);
  };

  useEffect(() => {
  
  }, [structure?.refreshToken]);

  return (
    <Flex direction="column" gap="2">
      {estado && (
        <Flex direction="column" gap="3" p="3">
          <Tabla onEditar={onEditarRow} />
          <VistaPrevia indice="268" />
          <ButtonCreateRecordFloating
            toolTip="Error"
            onClick={() => {
              setEstado(StatusEdit.create);
              setRowSelecionado({
                message: "",
                description: "",
                uuid: "",
                index: "",
                user: "",
                userDate: "",
                userApp: "",
              });
            }}
          />
        </Flex>
      )}

      {!estado && (
        <Flex direction="row" justify="between" p="3">
          <Flex direction="column" gap="3">
            <ErrorEdit
              estado={estado}
              row={rowSelecionado}
              onAtras={() => {
                setEstado(StatusEdit.find);
              }}
            />
          </Flex>
          <Flex gap="3">
            <Button
              onClick={() => {
                setEstado(StatusEdit.find);
              }}
            >
              <ChevronLeftIcon />
              Atras
            </Button>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default Error;
