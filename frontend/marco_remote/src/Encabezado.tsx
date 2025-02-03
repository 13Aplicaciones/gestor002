import { Box, Flex, Separator, Text } from "@radix-ui/themes"
import { ReactNode } from "react";
import { Alerts, Informar } from "api-fetch";
import { useTranslation } from "react-i18next";
import BotonMenu from "./componetes/BotonMenu";
import BotonSession from './componetes/BotonSession';
import logo from './assets/logo.png';

/**
 * Función que muestra un message de información dinámico.
 * 
 * @param param0 
 * @returns 
 */
const informacionDinamica = () => {

    //TODO poner proceso FETCH API de busqueda de messages desde tabla de messages por empresa
    const message = "Este es un message de prueba <a href='https://www.google.com'>Google</a> <a href='https://www.yahoo.com'>Yahoo</a>";
    
    if (message) {
        return (
            <Informar message={message} alert={Alerts.success} />
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
                        <Text as="div" weight="bold" color="sky" size={{ xs: "1", sm: "2", md: "3", lg: "4", xl: "5" }}>{t("marco.header")}</Text>
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