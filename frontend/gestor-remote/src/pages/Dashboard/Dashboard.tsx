import { Badge, Box, Button, Card, Flex, Heading, Link as MiLink, Text } from "@radix-ui/themes";
import { Alerts, GridDashboard, useToastContext } from "api-fetch";
import { InfoCircledIcon, CubeIcon, MinusCircledIcon, PersonIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import CardGrid from "./components/Card";


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
        <Flex direction="column" gap="4" p="5" width="100%" height="100vh">
            <Heading size="5">Gestor Aplicaciones</Heading>
            <Text size="4" weight="medium">Adminitracion general del sistema para poder generar nuevos mddulo genricos</Text>
            <GridDashboard >

                <CardGrid   
                    title="Usuarios"
                    description="Usuarios registrados en el sist arios registrados en el Usuarios registrados en el sistema,"
                    onClick={mostrarError}
                    cardIcon={<PersonIcon width="5vw" height="5vw" />}
                />

                <Card size="2" onClick={mostrarError} style={{ cursor: 'pointer' }} >
                    <Flex direction="column" gap="2" p="2" width="100%" align="start">
                        <Flex
                            align="start"
                            gap="2"
                            justify="between"
                            width="100%"
                            direction={{ xs: "column", sm: "column", md: "row", lg: "row", xl: "row" }}>
                            <Flex
                                align="start"
                                direction="column"
                                gap="2"
                            >
                                <PersonIcon width="5vw" height="5vw" />
                                <Box>
                                    <Text as="p" size="2" weight="bold">
                                        Usuarios
                                    </Text>
                                    <Text as="p" size="2" color="gray">
                                        Usuarios registrados en el sist arios registrados en el Usuarios registrados en el sistema,
                                    </Text>
                                </Box>
                            </Flex>
                            <Flex gap="2" direction={{ xs: "row", sm: "row", md: "column", lg: "column", xl: "column" }} >
                                <Badge size="3" color="green"><strong>53</strong>Activos</Badge>
                                <Badge size="3" color="blue"><strong>9</strong> Edición</Badge>
                                <Badge size="3" color="orange"><strong>11</strong> Borrados</Badge>
                            </Flex>
                        </Flex>
                        <MiLink size="2" underline="auto" weight="medium">
                            Editar <Pencil1Icon height="16" width="16" />
                        </MiLink>
                    </Flex>
                </Card>

                <Card size="2">
                    <Flex direction="row" p="2" justify="between" align="start" width="100%">
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
                    <Flex direction="row" p="2" justify="between" align="start" width="100%">
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
                    <Flex direction="row" p="2" justify="between" align="start" width="100%">
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
            </GridDashboard>
        </Flex>
    );
}

export default Dashboard;
