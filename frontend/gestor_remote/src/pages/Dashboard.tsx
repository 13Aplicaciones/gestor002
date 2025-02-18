import { Button, Flex } from "@radix-ui/themes";
import { Alerts,  DialogForm, useToastContext } from "api-fetch";
import { useState } from "react";

const Dashboard = () => {
    const [miData, setMiData] = useState("");    
    const { showToast } = useToastContext();
    const texto = "Texto de prueba<Strong>hola</Strong><br>Texto de prueba<br>Texto de prueba <h1>hola</h1>";
    const title = "<strong>hola</strong> super title <a href='https://www.google.com'>google</a>";

    const mostrarError = () => {
        showToast(
            title,
            texto,
            Alerts.warning,
        );
    };


    return (
        <Flex direction="column" gap="1">
            
            <h1>Dashboard</h1>

            <Button onClick={mostrarError}>Mostrar error super error </Button>

            <Button onClick={
                () => {                    
                    console.log("hola");
                    console.log("hola " + miData);
                    setMiData("hola");
                    console.log("hola " + miData);
                }
            }>Mostrar error</Button>

            <Button onClick={
                () => {
                    //dispatch(showDialogDinamico('1'));
                }
            }>Abrir dialogo 1!!</Button>

            

            <DialogForm
                id='1'
                title="Agregar RUC"
                description="Ingrese el <strong>RUC</strong> que desea agregar"
                buttons={
                    <>
                        <Button size="3" variant="surface" onClick={
                            () => {
                                //dispatch(hideDialogDinamico('1'));
                            }
                        }>cerrar </Button>
                        <Button size="3" variant="soft" onClick={
                            () => {
                                //dispatch(hideDialogDinamico('1'));
                            }
                        }>cerrar45 </Button>
                    </>
                }
            >
                {
                    <div style={{ padding: 20, display: 'flex', justifyContent: 'space-between' }}>
                        <label >
                            Ejemplo:
                            <input type="text" />
                        </label>

                    </div>
                }
            </DialogForm>            
        </Flex>
    );
}

export default Dashboard;
