import { Button } from "@radix-ui/themes";
import { useDispatch } from 'react-redux';
import { DialogAlerts, DialogForm } from "../components/dialog/Dialog";
import { Alerts } from "../ConstantsPresentation";
import { hideDialogDinamico, showDialogDinamico } from "../store/DialogSlice";

/**
 * Demo de dialogos
 * 
 * @author @omargo33
 * @returns 
 */
const MiDialogos = () => {

    const dispatch = useDispatch();

    return (
        <>
            <div style={{ padding: 20, display: 'flex', justifyContent: 'space-between', width: '60%' }}>
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
            </div>

            <div style={{ padding: 20, display: 'flex', justifyContent: 'space-between', width: '60%' }}>
                <Button onClick={
                    () => {
                        dispatch(showDialogDinamico('2'));
                    }
                }>Abrir dialogo 2 !!</Button>

                <DialogAlerts
                    id='2'
                    cancel={true}
                    title="Agregar RUC"
                    description="Ingrese el <strong>RUC</strong> que desea agregar"
                    alert={Alerts.warning}
                >
                </DialogAlerts>
            </div>
        </>
    )
}

export { MiDialogos };