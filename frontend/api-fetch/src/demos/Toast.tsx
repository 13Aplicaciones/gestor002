import { useState } from "react";
import DemoToast from "../components/toast/DemoToast";
import { useToastContext } from "../components/toast/useToastContext";
import { Alerts } from "../ConstantsPresentation";
import { Button, Flex } from "@radix-ui/themes";
import { useToast } from "../components/toast/useToast";
import CustomToast from "../components/toast/CustomToast";

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

    const { open, showToast, hideToast } = useToast();


    //const { showToast1 } = useToastContext();
    const texto = "Texto de prueba<Strong>hola</Strong><br>Texto de prueba<br>Texto de prueba <h1>hola</h1>";
    const title = "<strong>hola</strong> super title <a href='https://www.google.com'>google</a>";

    const [status, setStatus] = useState(true);

    const mostrarError = () => {
        /*showToast1(
            title,
            texto,
            Alerts.error,
        );*/
    };

    const mostrarInfo = () => {
        /*showToast1(
            "title",
            "Descripción",
            Alerts.info,
        );*/
    };

    const mostrarSuccess = () => {
        /*showToast1(
            "title",
            "Descripción 001",
            Alerts.success,
        );*/
    };

    const mostrarWarning = () => {
        /*showToast1(
            "DATA",
            "Descripción",
            Alerts.warning,
        );*/
    };

    const mostrarDemoToast = () => {
        console.log("status " + status);
        setStatus(!status);
    };


    return (

        <Flex direction="row" align="center" gap="3" p="3">
            <Button onClick={mostrarError}>Mostrar error</Button>
            <Button onClick={mostrarInfo}>Mostrar info</Button>
            <Button onClick={mostrarSuccess}>Mostrar Success</Button>
            <Button onClick={mostrarWarning}>Mostrar Warnig</Button>

            <Button onClick={mostrarDemoToast}>Mostrar Demo Toast!!</Button>
            <DemoToast status={true} />

            <button onClick={showToast}>Mostrar Toast</button>
            <CustomToast
                open={open}
                onOpenChange={hideToast}
                title="Notificación"
                description="Este es un mensaje de toast."
                actionText="Cerrar"
            />
        </Flex>

    );
}

export { MiToast };