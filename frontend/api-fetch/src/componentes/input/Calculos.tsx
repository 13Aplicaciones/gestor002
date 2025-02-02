import { useMediaQuery } from 'react-responsive';
import { BandaPresentacion, Direccion } from '../../ConstantesPresentacion';

/**
 * Funciones de calculos para la presentacion dinamica.
 * 
 * @autor @omargo33
 * @since 2025-01-20
 * 
 */

/**
 * Interfaz para la presentación de los campos de texto
 * 
 * @returns 
 */
interface IPresentacion {
    alinear: string;
    justificar: string;
    direccion: Direccion;
    ancho: string | undefined;
}

/**
 * hook para calcular la presentación de los campos de texto
 * 
 * @param direccionLabel Dirección de la presentación 
 * @param columnas Columnas de la presentación
 * @param width Ancho de la presentación
 *  
 * @returns 
 */
const useCalcularPresentacion = (direccionLabel: Direccion | Direccion.horizontal, columnas?: BandaPresentacion, width?: string) => {
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
    const respuesta: IPresentacion = {
        alinear: "end",
        justificar: "end",
        direccion: Direccion.horizontal,
        ancho: ''
    };
    
    if (direccionLabel === Direccion.vertical) {
        respuesta.alinear = "start";
        respuesta.justificar = "start";
    } else {
        respuesta.alinear = isPortrait ? "start" : "center";
        respuesta.justificar = isPortrait ? "start" : "end";
    }

    respuesta.direccion = isPortrait ? Direccion.vertical : direccionLabel;
    respuesta.ancho = isPortrait ? width : 'calc(100vw * ' + (columnas ? columnas : BandaPresentacion.columna_1) + ')'

    return respuesta;
};

export default useCalcularPresentacion;