import { Button } from "@radix-ui/themes";
import { CrearCampoBusqueda } from "../componentes/tabla/TablaBusqueda";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { FormatoTexto, JustificacionTexto, OrdenarColumna } from "../ConstantesPresentacion";
import { IRowDataError } from "./ErroresVistaPrevia";

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
        indice: '',
        mensaje: '',
    };

    const presentacionItems = {
        banding: false,
        encabezados: true,
        numeroLinea: false,
        skeleton: {
            with: "90vw",
        },
        items:
            [
                {
                    nombre: "indice",
                    titulo: "Indice",
                    justificacion: JustificacionTexto.start,
                    formato: FormatoTexto.none,
                    width: "10vw",
                    orden: OrdenarColumna.neutro,
                },
                {
                    nombre: "mensaje",
                    titulo: "Mensaje que hay",
                    justificacion: JustificacionTexto.start,
                    formato: FormatoTexto.none,
                    width: "20vw",
                    accion: (row: IRowDataError) => {                        
                        if (onEditar) {
                            onEditar(row);
                        }
                    },
                },

                {
                    nombre: "descripcion",
                    titulo: "Descripción",
                    justificacion: JustificacionTexto.start,
                    formato: FormatoTexto.none,
                    width: "40vw",
                },

                {
                    nombre: "usuarioFecha",
                    titulo: "Fecha",
                    justificacion: JustificacionTexto.start,
                    formato: FormatoTexto.none,
                    width: "20vw",
                    orden: OrdenarColumna.neutro,
                },
                {
                    nombre: "acciones",
                    titulo: "Acci.",
                    justificacion: "center",
                    formato: "empty",
                    width: "6vw",
                    componente: (row: IRowDataError) => (
                        <Button size="1" variant='ghost' onClick={() => console.log("nombre " + row.indice)}>
                            <DotsVerticalIcon width="16" height="16" />
                        </Button>
                    )
                },
            ]
    };

    return (
        <CrearCampoBusqueda
            apiUrl="http://localhost:8090/gestor-ws/api/errors/paginado"
            nombreIndice="indice"
            presentacionItem={presentacionItems}
            parametrosApi={parametros} >
        </CrearCampoBusqueda>
    );
}

export default Tabla;