import { Alerts } from "../ConstantsPresentation";
import { Button, Flex } from "@radix-ui/themes";
import { useToastContext } from "../components/toast/useToastContext";

/**
 * Ejemplo de componente que muestra un toast
 * 
 * Para su funcionameinto es necesario que el componente Toaster este en el arbol de componentes en main
 * @link ../main.tsx
 * 
 * @author @omargo33
 * 
 * @returns 
 */
const MiToast = () => {


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

    const mostrarInfo = () => {
        showToast(
            "title",
            "Descripción",
            Alerts.info,
        );
    };

    const mostrarSuccess = () => {
        showToast(
            "title",
            "Descripción 001",
            Alerts.success,
        );
    };

    const mostrarWarning = () => {
        showToast(
            "DATA",
            "Descripción",
            Alerts.warning,
        );
    };

    return (
        <Flex direction="row" align="center" gap="3" p="3">
            <Button onClick={mostrarSuccess}>Mostrar Success</Button>
            <Button onClick={mostrarInfo}>Mostrar info</Button>
            <Button onClick={mostrarWarning}>Mostrar Warnig</Button>
            <Button onClick={mostrarError}>Mostrar error</Button>
        </Flex>
    );
}

export { MiToast };