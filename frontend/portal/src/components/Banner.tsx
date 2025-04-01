import { Box, Card, Flex, Heading, Inset, Text } from "@radix-ui/themes";
import { gradientColor } from "ux-ui/src/components/IconosColoresAlerts";
import { useThemeContext } from "@radix-ui/themes";
import { getIconComponent } from "ux-ui";

/**
 * Componentes para la pagina principal
 * 
 * @author omargo33
 * @since 2025-03-31
 * 
 */

/**
 * Componente Banner
 * 
 * @param title Titulo del banner
 * @param subTitle Subtitulo del banner
 * @param description Descripcion del banner
 * @param iconName Nombre del icono
 * 
 * @returns 
 */
const Banner = ({ title = "title", subTitle = "subTitle", description = "description", iconName = "GearIcon" }: { title: string; subTitle: string, description: string, iconName: string }) => {
    const theme = useThemeContext();
    const color = theme.accentColor;
    const background = gradientColor(color);

    return (
        <Box maxWidth="100%">
            <Card size="2">
                <Inset clip="padding-box" side="top" pb="current">
                    <Flex
                        height="230px"
                        position="relative"
                        style={{
                            background: background,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                    </Flex>
                </Inset>
                <Text as="p" size="3">
                    <span dangerouslySetInnerHTML={{ __html: description }} />
                </Text>
                <Box
                    position="absolute"
                    top="-100px"
                    right="-50px"
                    style={{
                        opacity: 0.38,
                        fontSize: "100px",
                        lineHeight: "1",
                    }} >
                    <Text as="span" >
                        {getIconComponent(iconName, "340px", "340px")}
                    </Text>
                </Box>

                <Box position="absolute" top="75px">
                    <Flex direction="column" align="start" justify="center">
                        <Heading size="9">{title}</Heading>
                        <Heading size="7" weight="bold">{subTitle}
                        </Heading>
                    </Flex>
                </Box>
            </Card>
        </Box>
    );
};

export default Banner;