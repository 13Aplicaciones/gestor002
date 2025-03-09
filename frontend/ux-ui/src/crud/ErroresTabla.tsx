import { Button } from "@radix-ui/themes";
import { CreateSearchField } from "../components/table/TableSearch";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { IRowDataError } from "./ErroresVistaPrevia";
import { TextFormat, JustificationText, SortColumn } from "../ConstantsPresentation";

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
        index: '',
        message: '',
    };

    const presentationItems = {
        banding: false,
        headers: true,
        numberLine: false,
        skeleton: {
            with: "90vw",
        },
        items:
            [
                {
                    name: "indice",
                    title: "Indice",
                    justification: JustificationText.start,
                    format: TextFormat.none,
                    width: "10vw",
                    order: SortColumn.neutral,
                },
                {
                    name: "mensaje",
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
                    name: "descripcion",
                    title: "Descripción",
                    justification: JustificationText.start,
                    format: TextFormat.none,
                    width: "40vw",
                },

                {
                    name: "usuarioFecha",
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
                        <Button size="1" variant='ghost' onClick={() => console.log("index", row.index)}>
                            <DotsVerticalIcon width="16" height="16" />
                        </Button>
                    )
                },
            ]
    };

    return (
        <CreateSearchField
            apiUrl="http://localhost:8090/gestor-ws/api/errors/paginado"
            nameIndex="index"
            presentationItem={presentationItems}
            parametersApi={parametros} >
        </CreateSearchField>
    );
}

export default Tabla;