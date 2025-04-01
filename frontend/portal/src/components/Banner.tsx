import { Box, Card, Flex, Heading, Inset, Text } from "@radix-ui/themes";
import { gradientColor } from "ux-ui/src/components/IconosColoresAlerts";
import { useThemeContext } from "@radix-ui/themes";
import { getIconComponent } from "ux-ui";
import { IBannerRoot } from "../routes/Structure";

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
const Banner = ({ banner }: { banner:IBannerRoot }) => {
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
                    <span dangerouslySetInnerHTML={{ __html: banner.description }} />
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
                        {getIconComponent(banner.iconName, "340px", "340px")}
                    </Text>
                </Box>

                <Box position="absolute" top="75px">
                    <Flex direction="column" align="start" justify="center">
                        <Heading size="9">{banner.title}</Heading>
                        <Heading size="7" weight="bold">{banner.subTitle}
                        </Heading>
                    </Flex>
                </Box>
            </Card>
        </Box>
    );
};

export default Banner;