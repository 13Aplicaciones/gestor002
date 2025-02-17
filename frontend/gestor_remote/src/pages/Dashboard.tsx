import { Button, Flex } from "@radix-ui/themes";
import { DialogForm, MioToast } from "api-fetch";
import { hideDialogDinamico, showDialogDinamico } from "api-fetch/src/store/DialogSlice";
import { useDispatch } from "react-redux";

const Dashboard = () => {
    const dispatch = useDispatch();

    /*
    const mostrarError = () => {
        console.log("hola 23");
    };
    */

    return (
        <Flex direction="column" gap="1">
            
            <h1>Dashboard</h1>

            <MioToast />


            <Button onClick={
                () => {                    
                    console.log("hola");
                }
            }>Mostrar error</Button>

            <Button onClick={
                () => {
                    dispatch(showDialogDinamico('1'));
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
                                dispatch(hideDialogDinamico('1'));
                            }
                        }>cerrar </Button>
                        <Button size="3" variant="soft" onClick={
                            () => {
                                dispatch(hideDialogDinamico('1'));
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
