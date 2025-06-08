import { blackA, whiteA } from "@radix-ui/colors";
import { Box, Flex, useThemeContext } from "@radix-ui/themes";
import { ReactNode } from "react";

/**
 * Componente BoxShadow que proporciona un contenedor con sombra y bordes redondeados que se adapta al tema actual.
 *
 * @param children - Elementos hijos que se mostrarán dentro del BoxShadow
 * @returns
 */
const BoxTheme = ({
  children,
  look,
}: {
  children: ReactNode;
  look: "shadowLine" | "shadow" | "line" | "none";
}) => {
  const theme = useThemeContext();
  const radiusTheme = theme.radius;
  const radiusMapping = {
    full: 5,
    large: 4,
    medium: 3,
    small: 2,
    none: 1,
  };

  return (
    <Box
      style={{
        borderRadius: "var(--radius-" + (radiusMapping[radiusTheme] || 3) + ")",
        ...(look === "shadowLine" || look === "line"
          ? {
              border: "calc(1px * var(--scaling)) solid",
              borderColor: "var(--" + theme.accentColor + "-10)",
            }
          : {}),
        ...(look === "shadow" || look === "shadowLine"
          ? {
              background:
                theme.appearance === "light" ? blackA.blackA1 : whiteA.whiteA1,
            }
          : {}),
        ...(look === "none" && theme.appearance === "light"
          ? {
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }
          : {
              background: whiteA.whiteA1,
            }),
      }}
    >
      <Flex direction="column" align="start" gap="6" p="6">
        {children}
      </Flex>
    </Box>
  );
};

export { BoxTheme };
