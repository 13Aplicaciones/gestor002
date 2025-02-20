import { Pencil1Icon } from "@radix-ui/react-icons";
import { Badge, Box, Card, Flex, Link, Text } from "@radix-ui/themes";

import { MouseEventHandler, ReactNode } from "react";


const CardGrid = ({ title, description, descriptionLength = 80, onClick, cardIcon }: { title: string, description: string, descriptionLength?: number, onClick?: MouseEventHandler<HTMLDivElement>, cardIcon?: ReactNode; }) => {
    return (
        <Card size="2" onClick={onClick} style={{ cursor: 'pointer' }}>
            <Flex direction="column" gap="2" p="2" width="100%" align="start">
                <Flex
                    align="start"
                    gap="2"
                    justify="between"
                    width="100%"
                    direction={{ xs: "column", sm: "column", md: "row", lg: "row", xl: "row" }}
                >
                    <Flex align="start" direction="column" gap="2">
                        {cardIcon}
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
                    <Flex gap="2" direction={{ xs: "row", sm: "row", md: "column", lg: "column", xl: "column" }}>
                        <Badge size="3" color="green">
                            <strong>53</strong> Activos
                        </Badge>
                        <Badge size="3" color="blue">
                            <strong>9</strong> Edición
                        </Badge>
                        <Badge size="3" color="orange">
                            <strong>11</strong> Borrados
                        </Badge>
                    </Flex>
                </Flex>
                <Link size="2" underline="auto" weight="medium">
                    Editar
                    <Pencil1Icon height="16" width="16" />
                </Link>
            </Flex>
        </Card>
    );
};


export default CardGrid;