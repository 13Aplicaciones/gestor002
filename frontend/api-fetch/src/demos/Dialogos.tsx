import { Button } from "@radix-ui/themes";
import { useDispatch } from 'react-redux';
import { DialogAlertas, DialogForm } from "../componentes/dialog/Dialgo";
import { Alertas } from "../ConstantesPresentacion";
import { hideDialogDinamico, showDialogDinamico } from "../redux/Store";

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
                    titulo="Agregar RUC"
                    descripcion="Ingrese el <strong>RUC</strong> que desea agregar"
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

                <DialogAlertas
                    id='2'
                    cancel={true}
                    titulo="Agregar RUC"
                    descripcion="Ingrese el <strong>RUC</strong> que desea agregar"
                    alerta={Alertas.warning}
                >
                </DialogAlertas>
            </div>
        </>
    )
}

export { MiDialogos };