import {
  Button,
  Flex,
  Heading,
  Text
} from "@radix-ui/themes";
import { BoxTheme } from "ux-ui";
import { IRowDataModule } from "../../Structures/Types";

/**
 * Componente para cambiar el estado de un módulo.
 *
 * @param row - Datos de la fila del módulo
 * @returns
 */
const ChangeStatus = ({ row }: { row?: IRowDataModule }) => {
  return (
    <BoxTheme look="none">
      <Heading size="3">Administracion de Estados</Heading>

      {row?.status === "A" ? (
        <Flex direction="row" gap="3" align="center">
          <Button variant="solid">Inactivar</Button>
          <Text>
            Inactiva el modulo para que los usuarios con los permisos adecuados
            no puedan acceder a él.
          </Text>
        </Flex>
      ) : (
        <Flex direction="row" gap="3" align="center">
          <Button variant="solid">Activar</Button>
          <Text>
            Activa el modulo para que los usuarios con los permisos adecuados
            puedan acceder a él.
          </Text>
        </Flex>
      )}
      <Text>
        Al cambiar el estado del módulo, esto afectará a todos los procesos
        relacionados con él, por lo que se recomienda realizar esta acción con
        precaución y con conocimiento de las consecuencias que este proceso
        tiene.
      </Text>
    </BoxTheme>
  );
};

export { ChangeStatus };
