import { blackA, whiteA } from "@radix-ui/colors";
import { Badge, Box, Card, Flex, Heading, Link, Skeleton, Text, useThemeContext } from "@radix-ui/themes";
import { MouseEventHandler } from "react";
import { useTranslation } from "react-i18next";
import { Alerts } from "../../ConstantsPresentation";
import { IconComponent } from "../icon/IconDynamic";
import { alertColor, mapStatusToAlert } from "../IconosColoresAlerts";

/**
 * DataItemBadge type.
 * 
 * @see alertColor
 * @see mapStatusToAlert
 */
type DataItemBadge = {
    value: string;
    description: string;
    status: "info" | "warning" | "success" | "error";
};

/**
 * BadgeCard component.
 * 
 * @data Datos para las bandas @see DataItemBadge
 * @length Longitud de las bandas por defecto 4
 * @descriptionLength Longitud de la descripción por defecto 10
 * 
 * @returns 
 */
const BadgeCard = (
    { data, length = 4, descriptionLength = 10 }:
        { data: DataItemBadge[], length?: number, descriptionLength?: number }
) => {
    data.splice(length);
    return (
        <Flex gap="2" direction={{ xs: "row", sm: "row", md: "column", lg: "column", xl: "column" }} >
            {data.map((item, index) => (
                <Badge key={index} size="3" color={alertColor({ alert: mapStatusToAlert(item.status) })}>
                    <strong>{item.value}</strong>
                    {item.description &&
                        <Text as="p" size="2" color="gray">
                            {item.description.length > descriptionLength ? `${item.description.substring(0, descriptionLength)}...` : item.description}
                        </Text>
                    }
                </Badge>
            ))}
        </Flex>
    );
};

/**
 * Función que muestra el valor y la descripción.
 * 
 * @title Texto para el titulo
 * @description Texto para la descripción, con formato html (<strong>, <br>, <h1>, etc)
 * @descriptionLength Longitud de la descripción por defecto 10
 * @alert Alerta para el color @see Alerts
 *  
 * @returns 
 */
const ValueDescriptionCard = (
    { title, description, descriptionLength = 20, alert }:
        { title?: string, description?: string, descriptionLength?: number, alert?: Alerts }) => {
    return (
        <Flex
            gap="2"
            align="center"
            direction={{ xs: "row", sm: "row", md: "column", lg: "column", xl: "column" }} >
            {title &&
                <Heading size={{ xs: "7", sm: "8", md: "8", lg: "9", xl: "9" }} color={alertColor({ alert })}>{title}</Heading>
            }
            {description &&
                <Text as="p" size="3" weight="bold" color={alertColor({ alert })}>
                    <span dangerouslySetInnerHTML={{
                        __html:
                            description.length > descriptionLength ? `${description.substring(0, descriptionLength)}...` : description
                    }} />
                </Text>
            }
        </Flex>
    );
}

/**
 * CardGrid component.
 * 
 * @title Texto para el titulo
 * @description Texto para la descripción
 * @descriptionLength Longitud de la descripción por defecto 80
 * @firtsColor Color de fondo distinto
 * @onClick Evento al hacer click
 * @cardIcon Icono para el card
 * @infoChildren Información adicional 
 * 
 * @returns 
 */
const CardGrid = (
    { title, description, iconName, descriptionLength = 80, firtsColor = false, onClick, data }:
        { title: string, description: string, iconName: string, descriptionLength?: number, firtsColor?: boolean, onClick?: MouseEventHandler<HTMLDivElement>, data: DataItemBadge[] }) => {

    const [t] = useTranslation("global_ux");
    const theme = useThemeContext();
    const colorBackground = (theme.appearance === "light") ? firtsColor ? blackA.blackA3 : blackA.blackA1 : firtsColor ? whiteA.whiteA3 : whiteA.whiteA1;

    return (
        <Card size="2" onClick={onClick} style={{ cursor: 'pointer', backgroundColor: colorBackground }}>
            <Flex direction="column" gap="2" p="2" width="100%" align="start">
                <Flex
                    align="start"
                    gap="2"
                    justify="between"
                    width="100%"
                    direction={{ xs: "column", sm: "column", md: "row", lg: "row", xl: "row" }}
                >
                    <Flex align="start" direction="column" gap="2">
                        <IconComponent iconName={iconName} width="5vw" height="5vw" />
                        <Box>
                            {title &&
                                <Text as="p" size="2" weight="bold">
                                    {title}
                                </Text>
                            }
                            {description &&
                                <Text as="p" size="2" color="gray">
                                    {description.length > descriptionLength ? `${description.substring(0, descriptionLength)}...` : description}
                                </Text>
                            }
                        </Box>
                    </Flex>
                    {data && (
                        data.length === 1 ? (
                            <ValueDescriptionCard
                                title={data[0].value}
                                description={data[0].description}
                                alert={mapStatusToAlert(data[0].status)}
                            />
                        ) : (
                            <BadgeCard data={data} length={4} />
                        )
                    )}
                </Flex>
                <Link size="2" underline="auto" weight="medium" >
                    <Flex align="center" gap="1">
                        {t("actions.edit")}
                        <IconComponent iconName="Pencil1Icon" width="16" height="16" />
                    </Flex>
                </Link>
            </Flex>
        </Card>
    );
};

/**
 * cardGridSkelton component.
 * 
 * @returns 
 */
const CardGridSkeleton = () => {
    return (
        <Card size="2" >
            <Flex direction="column" gap="2" p="2" width="100%" align="start">
                <Flex
                    align="start"
                    gap="2"
                    justify="between"
                    width="100%"
                    direction={{ xs: "column", sm: "column", md: "row", lg: "row", xl: "row" }}
                >
                    <Flex align="start" direction="column" gap="2">
                        <Skeleton width="4vw" height="4vw" />
                        <Skeleton >
                            <Text>
                                lorem ipsum dolor
                            </Text>
                        </Skeleton>
                        <Skeleton >
                            <Text>
                                lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </Text>
                        </Skeleton>
                        <Skeleton >
                            <Text>
                                lorem ipsum
                            </Text>
                        </Skeleton>
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    );
};


export { BadgeCard, CardGrid, CardGridSkeleton, ValueDescriptionCard };
export type { DataItemBadge };

