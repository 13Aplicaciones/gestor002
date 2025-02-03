import { Button, Flex } from "@radix-ui/themes";
import { Alerts } from "../ConstantesPresentacion";
import { useToast } from "../componentes/toast/Toast";


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

    const { toast } = useToast();
    const texto = "Texto de prueba<Strong>hola</Strong><br>Texto de prueba<br>Texto de prueba <h1>hola</h1>";
    const title = "<strong>hola</strong> super title <a href='https://www.google.com'>google</a>";

    const mostrarError = () => {
        toast({
            title: title,
            description: texto,
            alert: Alerts.error,
        });
    };

    const mostrarInfo = () => {
        toast({
            title: "title",
            description: "Descripción",
            alert: Alerts.info
        });
    };

    const mostrarSuccess = () => {
        toast({
            title: "title",
            alert: Alerts.success
        });
    };

    const mostrarWarning = () => {
        toast({
            description: "Descripción",
            alert: Alerts.warning
        });
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