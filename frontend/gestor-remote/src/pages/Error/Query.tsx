import { Button, Flex } from "@radix-ui/themes";
import { CreateSearchField } from "ux-ui";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { TextFormat, JustificationText, SortColumn } from "ux-ui";
import { IRowDataError } from "./ErroresVistaPrevia";
import {
  getToken,
  ITokenRoot,
  refreshToken,
} from "orchestrator_remote/service/Tokens";
import { useEffect, useState } from "react";

/**
 * Propiedades de la tabla de errores.
 */
interface ITablaProps {
  onEditar: (row: IRowDataError) => void;
}

/**
 * Tabla de errores del sistema.
 *
 * @param param0
 * @returns
 */
const Tabla: React.FC<ITablaProps> = ({ onEditar }) => {
  const parametros = {
    page: 0,
    size: 10,
    indice: "",
    message: "",
  };

  const presentationItems = {
    banding: false,
    headers: true,
    numberLinea: false,
    skeleton: {
      with: "90vw",
    },
    items: [
      {
        name: "index",
        title: "Indice",
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "10vw",
        order: SortColumn.neutral,
      },
      {
        name: "message",
        title: "Mensaje que hay",
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "20vw",
        accion: (row: IRowDataError) => {
          if (onEditar) {
            onEditar(row);
          }
        },
      },

      {
        name: "description",
        title: "Descripción",
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "40vw",
      },

      {
        name: "userDate",
        title: "Fecha",
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "20vw",
        order: SortColumn.neutral,
      },
      {
        name: "acciones",
        title: "Acci.",
        justification: "center",
        format: "empty",
        width: "6vw",
        componente: (row: IRowDataError) => (
          <Button
            size="1"
            variant="ghost"
            onClick={() => console.log("index", row.index)}
          >
            <DotsVerticalIcon width="16" height="16" />
          </Button>
        ),
      },
    ],
  };

  const [token, setToken] = useState<string>("");

  const fetchToken = async () => {
    const refreshedToken: ITokenRoot = await getToken();
    if (refreshedToken) {
      setToken(refreshedToken.access_token);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <Flex direction="column" gap="3">
      <CreateSearchField
        apiUrl="http://localhost:8090/gestor-ws/api/errors/paginado"
        nameIndex="in"
        presentationItem={presentationItems}
        parametersApi={parametros}
        token={token}
        getToken={async () => {
          return await refreshToken();
        }}
      />
    </Flex>
  );
};

export default Tabla;
