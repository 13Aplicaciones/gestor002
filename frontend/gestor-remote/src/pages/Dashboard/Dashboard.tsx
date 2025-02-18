import { Badge, Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { Alerts, useToastContext } from "api-fetch";
import { InfoCircledIcon, CubeIcon, MinusCircledIcon, PersonIcon } from "@radix-ui/react-icons";

const Dashboard = () => {

    const { showToast } = useToastContext();
    const texto = "Texto de prueba<Strong>hola</Strong><br>Texto de prueba<br>Texto de prueba <h1>hola</h1>";
    const title = "<strong>hola</strong> super title <a href='https://www.google.com'>google</a>";

    const mostrarError = () => {
        showToast(
            title,
            texto,
            Alerts.warning,
        );
    };

    return (
        <Flex direction="column" gap="5" p="5">
            <Heading size="7">Dashboard</Heading>
            <Grid columns="3" gap="5">

                <Card size="2">
                    <Flex direction="row" justify="between" align="baseline" width="100%">
                        <Flex gap="1" direction="column" align="start">
                            <PersonIcon width="5vw" height="5vw"  color="orange" />
                            <Box>
                                <Text as="div" size="2" weight="bold">
                                    Usuarios
                                </Text>
                                <Text as="div" size="2" color="gray">
                                    Usuarios registrados en el sistema
                                </Text>
                            </Box>
                        </Flex>
                        <Flex direction="column" gap="2">
                            <Badge size="3" color="green"><strong>53</strong>Activos</Badge>
                            <Badge size="3" color="blue"><strong>9</strong> Edición</Badge>
                            <Badge size="3" color="orange"><strong>11</strong> Borrados</Badge>
                        </Flex>
                    </Flex>
                </Card>

                <Card size="2">
                    <Flex direction="row" justify="between" align="baseline" width="100%">
                        <Flex gap="1" direction="column" align="start">
                            <CubeIcon width="5vw" height="5vw" />
                            <Box>
                                <Text as="div" size="2" weight="bold">
                                    Módulos
                                </Text>
                                <Text as="div" size="2" color="gray">
                                    Módulos que el sistema tiene para ofrecer
                                </Text>
                            </Box>
                        </Flex>
                        <Flex direction="column" gap="2">
                            <Badge size="3" color="green"><strong>53</strong>Activos</Badge>
                            <Badge size="3" color="blue"><strong>9</strong> Edición</Badge>
                            <Badge size="3" color="orange"><strong>11</strong> Borrados</Badge>
                        </Flex>
                    </Flex>
                </Card>


                <Card size="2">
                    <Flex direction="row" justify="between" align="baseline" width="100%">
                        <Flex gap="1" direction="column" align="start">
                            <InfoCircledIcon width="5vw" height="5vw" />
                            <Box>
                                <Text as="div" size="2" weight="bold">
                                    Información
                                </Text>
                                <Text as="div" size="2" color="gray">
                                    Información general del sistema
                                </Text>
                            </Box>
                        </Flex>
                        <Flex direction="column" gap="2">
                            <Badge size="3" color="green"><strong>53</strong>Activos</Badge>
                            <Badge size="3" color="blue"><strong>9</strong> Edición</Badge>
                            <Badge size="3" color="orange"><strong>11</strong> Borrados</Badge>
                        </Flex>
                    </Flex>
                </Card>


                <Card size="2">
                    <Flex direction="row" justify="between" align="baseline" width="100%">
                        <Flex gap="1" direction="column" align="start">
                            <MinusCircledIcon width="5vw" height="5vw" />
                            <Box>
                                <Text as="div" size="2" weight="bold">
                                    Errores
                                </Text>
                                <Text as="div" size="2" color="gray">
                                    Detalle de errores reportados
                                </Text>
                            </Box>
                        </Flex>
                        <Flex direction="column" gap="2">
                            <Badge size="3" color="green"><strong>53</strong>Activos</Badge>
                            <Badge size="3" color="blue"><strong>9</strong> Edición</Badge>
                            <Badge size="3" color="orange"><strong>11</strong> Borrados</Badge>
                        </Flex>
                    </Flex>
                </Card>


     


            </Grid>
        </Flex>
    );
}

export default Dashboard;
