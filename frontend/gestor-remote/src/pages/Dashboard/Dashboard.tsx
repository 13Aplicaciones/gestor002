import { Badge, Box, Button, Card, Flex, Grid, Heading, IconButton, Text } from "@radix-ui/themes";
import { Alerts, useToastContext } from "api-fetch";
import { InfoCircledIcon, CubeIcon, MinusCircledIcon, PersonIcon, ThickArrowRightIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";


/*
https://api.reactrouter.com/v7/functions/react_router.Link.html
*/

const Dashboard = () => {

    const { showToast } = useToastContext();
    const texto = "Texto de prueba<Strong>hola</Strong><br>Texto de prueba<br>Texto de prueba <h1>hola</h1>";
    const title = "<strong>hola</strong> super title <a href='https://www.google.com'>google</a>";

    const mostrarError = () => {
        showToast(
            title,
            texto,
            Alerts.error,
        );
    };

    return (
        <Flex direction="column" gap="9" p="5" width="100%" height="100vh">
            <Heading size="9">Gestor Aplicaciones</Heading>
            <Text size="8" weight="medium" align="center">Adminitracion general del sistema para poder generar nuevos mddulo genricos</Text>
            <Grid columns={{ xs: "1", sm: "2", md: "3", lg: "3", xl: "4" }} gap="5">
                <Card size="2" onClick={mostrarError} style={{ cursor: 'pointer' }} >
                    <Flex direction="row" justify="between" align="baseline" width="100%">
                        <Flex gap="2" direction="column" align="start">
                            <PersonIcon width="5vw" height="5vw" />
                            <Box>
                                <Text as="div" size="2" weight="bold">
                                    Usuarios
                                </Text>
                                <Text as="div" size="2" color="gray">
                                    Usuarios registrados en el sistema
                                </Text>
                            </Box>
                            <IconButton radius="small" variant="ghost" >
                                Ir
                                <ThickArrowRightIcon height="16" width="16" />
                            </IconButton>
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
                        <Flex direction="column" gap="2" align="center">
                            <Heading size={{ xs: "7", sm: "8", md: "8", lg: "9", xl: "9" }} color="red">60</Heading>
                            <Text size="3" color="orange">En <strong>15</strong> dias</Text>
                        </Flex>
                    </Flex>
                </Card>
                <Button onClick={mostrarError}>Mostrar error</Button>
            
                <Link to="/ruta-deseada">
                    <Button>Ir a Ruta Deseada</Button>
                </Link>
            </Grid>
        </Flex>
    );
}

export default Dashboard;
