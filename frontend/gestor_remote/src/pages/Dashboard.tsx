import { Button, Flex } from "@radix-ui/themes";
import { Alerts,  useToastContext } from "api-fetch";

const Dashboard = () => {
    const { showToast } = useToastContext();

  
    const mostrarError = () => {
        showToast(
            "title",
             "Descripción holaaaa !!!",
             Alerts.info,
        );
    };

    return (
        <Flex direction="column" gap="1">
            <h1>Dashboard</h1>
            <Button onClick={mostrarError}>Mostrar error</Button>

            
        </Flex>
    );
}

export default Dashboard;
