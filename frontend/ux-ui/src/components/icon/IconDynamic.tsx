import * as RadixIcons from "@radix-ui/react-icons";

/**
 * Función que retorna el componente de un icono para facilitar el uso dinámico de los mismos.
 * 
 * @param iconName Nombre del icono
 * 
 * @returns 
 */
const getIconComponent = (iconName: string, width: string , height: string) => {
    const IconComponent = RadixIcons[iconName as keyof typeof RadixIcons];
    return IconComponent ? <IconComponent width={width} height={height} /> : <RadixIcons.TransparencyGridIcon width={width} height={height} />;
};

export { getIconComponent }