import * as RadixIcons from "@radix-ui/react-icons";
import { useThemeContext } from "@radix-ui/themes";

/**
 * Función que retorna el componente de un icono para facilitar el uso dinámico de los mismos.
 *
 * @param iconName Nombre del icono
 *
 * @returns
 */
const getIconComponent = (iconName: string, width: string, height: string) => {
  try {
    const IconComponent = RadixIcons[iconName as keyof typeof RadixIcons];
    return IconComponent ? (
      <IconComponent width={width} height={height} />
    ) : (
      <RadixIcons.TransparencyGridIcon width={width} height={height} />
    );
  } catch (error) {
    console.error("getIconComponent -> Error: ", error);
    return <RadixIcons.TransparencyGridIcon width={width} height={height} />;
  }
};

/**
 * Componente que retorna el icono solicitado en el tamaño solicitado y resiliente a la escala.
 * 
 * @param iconName
 * @param width
 * @param height
 * 
 * @returns 
 */
const IconComponent = ({
  iconName,
  width,
  height,
}: {
  iconName: string;
  width: string;
  height: string;
}) => {
  const contex = useThemeContext();
  const escala = contex.scaling;
  const widtCalculate: string = Math.round(
    (parseInt(width) / 100) * parseInt(escala)
  ).toString();
  const heightCalculate: string = Math.round(
    (parseInt(height) / 100) * parseInt(escala)
  ).toString();

  return <>{getIconComponent(iconName, widtCalculate, heightCalculate)}</>;
};

export { IconComponent };
