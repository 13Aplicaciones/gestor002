import { Button, Flex } from "@radix-ui/themes";
import { CreateSearchField, IPresentationTable } from "ux-ui";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import {
  getToken,
  ITokenRoot,
  refreshToken,
} from "orchestrator_remote/service/Tokens";
import { IRowDataError, parametersQuery } from "./ErrorTypes";
import { TextFormat, JustificationText, SortColumn } from "ux-ui";
import { useEffect, useState } from "react";

/**
 * Propiedades de la tabla de errores.
 */
interface ITablaProps {
  onEdit: (row: IRowDataError) => void;
}

/**
 * Tabla de errores del sistema.
 *
 * @param param0
 * @returns
 */
const Tabla: React.FC<ITablaProps> = ({ onEdit }) => {
  /**
   * Presentación de los items de la tabla.
   */
  const presentationItems: IPresentationTable = {
    banding: false,
    headers: true,
    numberLinea: false,
    skeletonWidth: "90vw",
    items: [
      {
        name: "index",
        title: "Indice",
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "10vw",
        order: SortColumn.asc,
      },
      {
        name: "message",
        title: "Mensaje que hay",
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "20vw",
        onAction: {
          onAction: (row: IRowDataError) => {
            console.log("Editar", row);
            
            if (onEdit) {
              onEdit(row);
              console.log("Editar", row);
            }
          },
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
        order: SortColumn.desc,
      },
      {
        name: "acciones",
        title: "Acci.",
        justification: JustificationText.center,
        format: TextFormat.action,
        width: "6vw",
        component: (row: IRowDataError) => (
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

  const [token, setToken] = useState("");

  /**
   * Función para obtener el token.
   */
  const fetchToken = async () => {
    const refreshedToken: ITokenRoot = await getToken();
    if (refreshedToken) {
      setToken(refreshedToken.access_token);
    }
  };

  /**
   * Efecto para obtener el token.
   */
  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <Flex direction="column" gap="3">
      <CreateSearchField
        apiUrl="http://localhost:8090/gestor-ws/api/errors/paginado"
        nameIndex="index"
        presentationTable={presentationItems}
        parametersApi={parametersQuery}
        token={token}
        getToken={async () => {

          const myToken=await refreshToken();

          if(myToken){
            console.log("myToken",myToken);
            setToken(myToken);
          }

          return myToken;
        }}
      />
      <Button
        size="3"
        variant="solid"
        onClick={async () => {
          const refreshedToken: ITokenRoot = await getToken();
          if (refreshedToken) {
            setToken(refreshedToken.access_token);
            //console.log("Token: ", refreshedToken.access_token.substring(0, 80));
            console.log("Token: ",token);
          }
        }}
      >
        Generar
      </Button>
    </Flex>
  );
};

export default Tabla;
