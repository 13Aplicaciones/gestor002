/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex } from "@radix-ui/themes";
import {
  GearIcon,
  LineHeightIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import {
  IPresentationTable,
  TableConfigurable,
} from "../components/table/Table";
import { JustificationText, TextFormat } from "../ConstantsPresentation";

/**
 * Funcion para crear una tabla.
 *
 * @returns
 */
const miTablaDemo = () => {
  const data = {
    totalItems: 2,
    totalPages: 1,
    currentPage: 0,
    items: [
      {
        uuid: "189098-123123-123123",
        name: "Supeer nombren",
        descripcon: "description",
        instancia: "instancia",
        valor: 10.23,
        fecha: "2021-06-01T12:34:34",
      },
      {
        uuid: "000098-123123-123123",
        name: "nombre",
        descripcon:
          "description super interesante description super interesante description super interesante",
        instancia: "instancia--",
        valor: 100.1,
        fecha: "2025-06-01T12:34:30",
      },
      {
        uuid: "199998-999-123123",
        name: "omar",
        descripcon: "description",
        instancia: "instancia001",
        valor: 12000,
      },
      {
        uuid: "788998-999-123123",
        name: "omar",
        descripcon: "description",
        instancia: "instancia001",
        valor: 10000,
      },
      {
        uuid: "123123-199998-999",
        name: "omar",
        descripcon: "description",
        instancia: "instancia001",
        valor: 111111,
      },
      {
        uuid: "788998-999-123123",
        name: "omar",
        descripcon: "description",
        instancia: "instancia001",
        valor: 10000,
      },
    ],
  };

  const presentation: IPresentationTable = {
    banding: true,
    headers: true,
    numberLinea: true,
    skeletonWidth: "10vw",
    items: [
      {
        name: "nombre",
        title: "Nombre",
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "30vw",
        onAction: {
          onAction: (row: any) => {
            console.log("Editar", row);
            /*
            if (onEditar) {
              onEditar(row);
              console.log("Editar", row);
            }*/
          },
        },
      },
      {
        name: "descripcon",
        title: "Descripción",
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "10vw",
      },
      {
        name: "fecha",
        title: "Fecha de Ingreso",
        justification: JustificationText.start,
        format: TextFormat.date,
        width: "10vw",
        onAction: {
          onAction: (row: any) => {
            console.log("Editar", row);
            /*
            if (onEditar) {
              onEditar(row);
              console.log("Editar", row);
            }*/
          },
        },
      },
      {
        name: "valor",
        title: "Total $",
        justification: JustificationText.end,
        format: TextFormat.decimal2,
        width: "10vw",
      },

      {
        name: "acciones",
        title: "Acciones",
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "6vw",
        onAction: {
          onAction: (row: any) => {
            console.log("Editar", row);
            /*
            if (onEditar) {
              onEditar(row);
              console.log("Editar", row);
            }*/
          },
        },

        component: (row: any) => (
          <Flex direction="row" gap="2">
            <Button
              size="1"
              variant="ghost"
              onClick={() => console.log("nombre " + row.nombre)}
            >
              <MagnifyingGlassIcon width="16" height="16" />
            </Button>
            <Button
              size="1"
              variant="ghost"
              onClick={() => console.log("uuid " + row.uuid)}
            >
              <GearIcon width="16" height="16" />
            </Button>
            <Button
              size="1"
              variant="ghost"
              onClick={() => console.log("row " + JSON.stringify(row))}
            >
              <LineHeightIcon width="16" height="16" />
            </Button>
          </Flex>
        ),
      },
    ],
  };

  return (
    <Flex direction="column" p="5" gap="3">
      <TableConfigurable
        data={data.items}
        presentationTable={presentation}
        presentationSorts={{}}
        isHeader={true}
        isLineNumber={true}
        isBand={true}
      />
    </Flex>
  );
};

export { miTablaDemo };
