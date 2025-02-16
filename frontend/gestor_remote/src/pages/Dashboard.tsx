import { Button, Flex } from "@radix-ui/themes";
import { Alerts, showToast } from "api-fetch";
import { useDispatch } from "react-redux";

const Dashboard = () => {
    const dispatch = useDispatch();
    const mostrarError = () => {
        dispatch(showToast({
            title: "title",
            description: "Descripción holaaaa !!!",
            alert: Alerts.info,
        }));
    };

    return (
        <Flex direction="column" gap="1">
            <h1>Dashboard</h1>
            <Button onClick={mostrarError}>Mostrar error</Button>

            
        </Flex>
    );
}

export default Dashboard;
