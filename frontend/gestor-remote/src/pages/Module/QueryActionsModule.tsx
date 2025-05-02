import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Button, DropdownMenu } from "@radix-ui/themes";
import { IRowDataModule } from "./Structures/Types";

/**
 * QueryMeny de la tabla de Modulos.
 *
 * @param param0
 * @returns
 */
const queryActionsModule = ({
  row,
  onEditRow,
}: {
  row: IRowDataModule;
  onEditRow: (row: IRowDataModule) => void;
}) => {
  const handleActivar = () => {
    console.log(`Accion del modulo: ${row.uuid}`);
  };

  const handleDesactivar = () => {
    console.log(`Desactivando el módulo: ${row.uuid}`);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button size="1" variant="ghost">
          <DotsVerticalIcon width="16" height="16" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item
          onClick={() => {
            if (onEditRow) {
              onEditRow(row);
            }
          }}
        >
          Edit
        </DropdownMenu.Item>
        {row.status == "A" && (
          <DropdownMenu.Item onClick={handleDesactivar}>
            Desactivar
          </DropdownMenu.Item>
        )}
        {row.status == "I" && (
          <DropdownMenu.Item onClick={handleActivar}>Activar</DropdownMenu.Item>
        )}
        <DropdownMenu.Separator />
        <DropdownMenu.Label>Comportamiento</DropdownMenu.Label>
        <DropdownMenu.Item>Roles</DropdownMenu.Item>
        <DropdownMenu.Item>Menus</DropdownMenu.Item>
        <DropdownMenu.Item>Codigo Definos por el Usuario</DropdownMenu.Item>
        <DropdownMenu.Item>Parametros</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default queryActionsModule;
