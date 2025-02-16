import { Alerts } from "../ConstantsPresentation";
import { Button, Flex } from "@radix-ui/themes";
import { showToast } from "../store/ToastSlice";
import { useDispatch } from "react-redux";

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
    const texto = "Texto de prueba<Strong>hola</Strong><br>Texto de prueba<br>Texto de prueba <h1>hola</h1>";
    const title = "<strong>hola</strong> super title <a href='https://www.google.com'>google</a>";

    const dispatch = useDispatch();
    const mostrarError = () => {
        dispatch(showToast({
            title: title,
            description: texto,
            alert: Alerts.error,
        }));
    };

    const mostrarInfo = () => {
        dispatch(showToast({
            title: "title",
            description: "Descripción",
            alert: Alerts.info,
        }));
    };

    const mostrarSuccess = () => {
        dispatch(showToast({
            title: "title",
            alert: Alerts.success,
        }));
    };

    const mostrarWarning = () => {
        dispatch(showToast({
            description: "Descripción",
            alert: Alerts.warning,
        }));
    };
    return (
        <Flex direction="row" align="center" gap="3" p="3">
            <Button onClick={mostrarError}>Mostrar error</Button>
            <Button onClick={mostrarInfo}>Mostrar info</Button>
            <Button onClick={mostrarSuccess}>Mostrar Success</Button>
            <Button onClick={mostrarWarning}>Mostrar Warnig</Button>
        </Flex>
    );
}

export { MiToast };