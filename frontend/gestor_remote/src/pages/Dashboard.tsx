import { Button, Flex } from "@radix-ui/themes";
import { CustomToast, DialogForm, useToast } from "api-fetch";
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

    return (
        <Flex direction="column" gap="1">
            
            <h1>Dashboard</h1>

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
