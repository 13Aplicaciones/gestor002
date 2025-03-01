import { useMediaQuery } from 'react-responsive';
import { BandPresentation, Direccion } from '../../ConstantsPresentation';

/**
 * Funciones de calculos para la presentation dinamica.
 * 
 * @autor @omargo33
 * @since 2025-01-20
 * 
 */

/**
 * Interfaz para la presentación de los fields de texto
 * 
 * @returns 
 */
interface IPresentation {
    align: string;
    justify: string;
    direction: Direccion;
    width: string | undefined;
}

/**
 * hook para calcular la presentación de los fields de texto
 * 
 * @param directionLabel Dirección de la presentación 
 * @param columns Columnas de la presentación
 * @param width Ancho de la presentación
 *  
 * @returns 
 */
const useCalculatePresentation = (directionLabel: Direccion | Direccion.horizontal, columns?: BandPresentation, width?: string) => {
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
    const iPresentation: IPresentation = {
        align: "end",
        justify: "end",
        direction: Direccion.horizontal,
        width: ''
    };
    
    if (directionLabel === Direccion.vertical) {
        iPresentation.align = "start";
        iPresentation.justify = "start";
    } else {
        iPresentation.align = isPortrait ? "start" : "center";
        iPresentation.justify = isPortrait ? "start" : "end";
    }

    iPresentation.direction = isPortrait ? Direccion.vertical : directionLabel;
    iPresentation.width = isPortrait ? width : 'calc(100vw * ' + (columns ? columns : BandPresentation.column_1) + ')'

    return iPresentation;
};

export default useCalculatePresentation;