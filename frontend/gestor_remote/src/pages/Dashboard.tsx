import { Button, Flex } from "@radix-ui/themes";
import { Alerts, CustomToast, DialogForm, useToast, useToastContext } from "api-fetch";
import { hideDialogDinamico, showDialogDinamico } from "api-fetch/src/store/DialogSlice";
import { useDispatch } from "react-redux";

//import { useToast } from "./useToast";
import { useState } from "react";
//import CustomToast123 from "./CustomToast";

const Dashboard = () => {
    //const dispatch = useDispatch();

    const [miData, setMiData] = useState("");

    const { open, showToast, hideToast } = useToast();

    /*
    const mostrarError = () => {
        console.log("hola 23");
    };
    */

    const { showToast001 } = useToastContext();
    const texto = "Texto de prueba<Strong>hola</Strong><br>Texto de prueba<br>Texto de prueba <h1>hola</h1>";
    const title = "<strong>hola</strong> super title <a href='https://www.google.com'>google</a>";

    const mostrarError = () => {
        showToast001(
            title,
            texto,
            Alerts.error,
        );
    };


    return (
        <Flex direction="column" gap="1">
            
            <h1>Dashboard</h1>

            <Button onClick={mostrarError}>Mostrar error super error </Button>


            <button onClick={showToast}>Mostrar Toast123</button>
            <CustomToast
                open={open}
                onOpenChange={hideToast}
                title="Notificación"
                description="Este es un mensaje de toast."
                actionText="Cerrar"
            />


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
