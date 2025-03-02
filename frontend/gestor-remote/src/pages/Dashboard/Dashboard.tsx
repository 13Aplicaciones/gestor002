import { Alerts, CardGrid, CardGridSkeleton, DataItemBadge, GridDashboard, useToastContext } from "ux-ui";
import { Flex, Heading, Text } from "@radix-ui/themes";
//import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

/*
https://api.reactrouter.com/v7/functions/react_router.Link.html
*/
const Dashboard = () => {

    const { showToast } = useToastContext();
    const [t] = useTranslation("global");
    const texto = "Texto de prueba<Strong>hola</Strong><br>Texto de prueba<br>Texto de prueba <h1>hola</h1>";
    const title = "<strong>hola</strong> super title <a href='https://www.google.com'>google</a>";

    const mostrarError = () => {
        showToast(
            title,
            texto,
            Alerts.error,
        );
    };

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate data fetching
        const fetchData = async () => {
            try {
                // Simulate a delay
                await new Promise(resolve => setTimeout(resolve, 2000));
                // Set loading to false after data is fetched
                // setLoading(false); // Uncomment this line if you have a setLoading function
                setLoading(false); 
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const menus: { title: string; description: string; icon: string; firtsColor: string }[] = t("menus", { returnObjects: true });
    const data1: DataItemBadge[] = [
        { valor: "53", descripcion: "Activos chancedjflkajsdlkf", status: "info" },
        { valor: "11", descripcion: "Borrados", status: "success" },
        { valor: "9", descripcion: "Edición", status: "warning" },
        { valor: "1", descripcion: "Erroneos", status: "error" },
    ];

    const data2: DataItemBadge[] = [
        { valor: "53", descripcion: "Activos chancedjflkajsdlkf", status: "info" },
        { valor: "11", descripcion: "Borrados", status: "success" },
        { valor: "9", descripcion: "Edición", status: "warning" },
        { valor: "1", descripcion: "Erroneos", status: "error" },
    ];

    const data3: DataItemBadge[] = [
        { valor: "11", descripcion: "Borrados", status: "success" },
        { valor: "1", descripcion: "Erroneos", status: "error" },
    ];

    const data4: DataItemBadge[] = [
        { valor: "20 $ ", descripcion: "Ultimos 15 dias", status: "error" },
    ];

    return (
        <Flex direction="column" gap="4" p="5" width="100%" height="100vh">

            <Heading size="5">Gestor Aplicaciones</Heading>
            <Text size="4" weight="medium">Adminitracion general del sistema para poder generar nuevos mddulo genricos</Text>

            {!loading &&
                <GridDashboard >
                    {menus.map((item, index) => {
                        const dataName = `data${index + 1}`;
                        return (
                            <CardGrid
                                key={index}
                                title={item.title}
                                description={item.description}
                                onClick={mostrarError}
                                iconName={item.icon}
                                firtsColor={item.firtsColor}
                                data={eval(dataName)} />
                        );
                    })}
                </GridDashboard>}
            {loading &&
                <GridDashboard>
                    {[...Array(4)].map((_, index) => (
                        <CardGridSkeleton key={index} />
                    ))}
                </GridDashboard>
            }           
        </Flex>
    );
}

export default Dashboard;
