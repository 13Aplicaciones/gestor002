/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex } from "@radix-ui/themes";
import { GearIcon, LineHeightIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TableConfigurable } from "../componentes/tabla/Tabla";

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
          nombre: "Supeer nombren",
          descripcon: "descripcion",
          instancia: "instancia",
          valor: 10.23,
          fecha: "2021-06-01T12:34:34"
        },
        {
          uuid: "000098-123123-123123",
          nombre: "nombre",
          descripcon: "descripcion super interesante descripcion super interesante descripcion super interesante",
          instancia: "instancia--",
          valor: 100.1,
          fecha: "2025-06-01T12:34:30"
        },
        {
          uuid: "199998-999-123123",
          nombre: "omar",
          descripcon: "descripcion",
          instancia: "instancia001",
          valor: 12000
        },
        {
          uuid: "788998-999-123123",
          nombre: "omar",
          descripcon: "descripcion",
          instancia: "instancia001",
          valor: 10000
        },
        {
          uuid: "123123-199998-999",
          nombre: "omar",
          descripcon: "descripcion",
          instancia: "instancia001",
          valor: 111111
        },
        {
          uuid: "788998-999-123123",
          nombre: "omar",
          descripcon: "descripcion",
          instancia: "instancia001",
          valor: 10000
        }
      ]
    };
  
    const presentacion = [
      {
        nombre: "nombre",
        titulo: "Nombre",
        justificacion: "start",
        formato: "none",
        width: "30vw",
        accion: (row: any) => {
          console.log("nombre" + JSON.stringify(row));
        },
      },
      {
        nombre: "descripcon",
        titulo: "Descripción",
        justificacion: "start",
        formato: "none",
        width: "10vw",
      },
      {
        nombre: "fecha",
        titulo: "Fecha de Ingreso",
        justificacion: "start",
        formato: "date",
        width: "10vw",
        accion: (row: any) => {
          console.error("fecha " + JSON.stringify(row));
        }
      },
      {
        nombre: "valor",
        titulo: "Total $",
        justificacion: "end",
        formato: "##.##",
        width: "10vw",
      },
  
      {
        nombre: "acciones",
        titulo: "Acciones",
        justificacion: "start",
        formato: "empty",
        width: "6vw",
        accion: (row: any) => {
          console.error("nombre" + JSON.stringify(row));
        },
  
        componente: (row: any) => (
          <Flex direction="row"
            gap="2">
            <Button size="1" variant='ghost' onClick={() => console.log("nombre " + row.nombre)}>
              <MagnifyingGlassIcon width="16" height="16" />
            </Button>
            <Button size="1" variant='ghost' onClick={() => console.log("uuid " + row.uuid)}>
              <GearIcon width="16" height="16" />
            </Button>
            <Button size="1" variant='ghost' onClick={() => console.log("row " + JSON.stringify(row))}>
              <LineHeightIcon width="16" height="16" />
            </Button>
          </Flex>
        )
      },  
    ];
  
    return (
      <Flex direction="column" p="5" gap="3">
        <TableConfigurable
          data={data.items}
          presentacion={presentacion}
          isEncabezado={true}
          isNumeroLinea={true}
          isBanda={true} />
      </Flex>
    );
  }

export { miTablaDemo };