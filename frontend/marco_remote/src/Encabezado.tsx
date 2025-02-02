import { Box, Flex, Separator, Text } from "@radix-ui/themes"
import { ReactNode } from "react";
import { Alertas, Informar } from "api-fetch";
import { useTranslation } from "react-i18next";
import BotonMenu from "./componetes/BotonMenu";
import BotonSession from './componetes/BotonSession';
import logo from './assets/logo.png';

/**
 * Función que muestra un mensaje de información dinámico.
 * 
 * @param param0 
 * @returns 
 */
const informacionDinamica = () => {

    //TODO poner proceso FETCH API de busqueda de mensajes desde tabla de mensajes por empresa
    const mensaje = "Este es un mensaje de prueba <a href='https://www.google.com'>Google</a> <a href='https://www.yahoo.com'>Yahoo</a>";
    
    if (mensaje) {
        return (
            <Informar mensaje={mensaje} alerta={Alertas.success} />
        );
    }
}

/**
 * Encabezado de la aplicación.
 * 
 * @param param0 
 * @returns 
 */
const Encabezado = ({ children }: { children?: ReactNode }) => {
    const [t] = useTranslation("global");
    
    return (
        <Box style={{ background: "var(--sky)" }}>
            <Flex p="1" gap="5" display="flex" direction="row" align="center" justify="between">
                <Flex gap="3" pl="3" align="center">
                    <BotonMenu />
                    <img src={logo} alt="Logo" style={{ height: '5vh', maxHeight: 90, width: 'auto' }} />
                    <Flex direction="column">
                        <Text as="div" weight="bold" color="sky" size={{ xs: "1", sm: "2", md: "3", lg: "4", xl: "5" }}>{t("marco.encabezado")}</Text>
                        <Text as="div" truncate={true} size={{ xs: "1", sm: "1", md: "2", lg: "3", xl: "4" }}>Caja de Ahorro de los Trabajadores de la Universidad de Oriente</Text>
                    </Flex>
                </Flex>
                <Flex p="1" gap="5" display="flex" direction="row" align="center" justify="between">
                    {children}
                    <BotonSession />
                </Flex>
            </Flex>
            <Separator size="4" />
            {informacionDinamica()}
        </Box>
    )
}

export default Encabezado;