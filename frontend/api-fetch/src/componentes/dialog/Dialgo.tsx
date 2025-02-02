import '../../i18n';
import { alertaColor, alertaIconoSize } from '../IconosColoresAlertas';
import { Alertas } from '../../ConstantesPresentacion';
import { Button, Dialog, Flex, Separator } from '@radix-ui/themes';
import { hideDialogDinamico } from '../../redux/Store';
import { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

/**
 * Funciones de presentacion de Dialogos.
 * 
 * @autor @omargo33
 * @since 2025-01-20
 * 
 */

/**
 * Interfaz que representa el estado de la aplicación desde un array de store.
 * 
 * @see ../../redux/Store.tsx
 * 
 */
interface IRootState {
    dynamicDialogSlice: Array<{
        id: string;
        value: boolean;
    }>;
}

/**
 * Pie del dialogo que permite cerrar el dialogo o tener botones adicionales o unicos.
 * 
 * @param cerrarDialogo Función para cerrar el dialogo
 * @param textoAccion Texto del botón de acción
 * @param cancel Indica si se muestra el botón de cancelar
 * @param buttons Botones adicionales o unicos 
 * @returns 
 */
const pieDialogo =
    ({ cerrarDialogo, textoAccion, cancel = true, buttons }:
        {
            cerrarDialogo: () => void,
            textoAccion: string,
            cancel?: boolean,
            buttons?: ReactNode
        }) => {
        return (
            <>
                {buttons &&
                    <Flex direction="column" align="end">
                        <Separator my="3" size="4" />
                        <Flex direction="row" align="baseline" gap="2">
                            {buttons}
                            {cancel &&
                                <Button size="3" variant="solid" onClick={cerrarDialogo} >{textoAccion}</Button>
                            }
                        </Flex>
                    </Flex>
                }
                {!buttons && cancel &&
                    <Flex direction="column" align="end">
                        <Separator my="3" size="4" />
                        <Flex direction="row" align="baseline" gap="2">
                            <Button size="3" variant="solid" onClick={cerrarDialogo} >{textoAccion}</Button>
                        </Flex>
                    </Flex>
                }
            </>
        );
    }

/**
 * Dialogo para formularios 
 * 
 * @param id Identificador del dialogo
 * @param titulo Titulo del dialogo
 * @param descripcion Descripción del dialogo
 * @param cancel Indica si se muestra el botón de cancelar
 * @param children Contenido del dialogo
 * @param buttons Botones adicionales o unicos
 *
 */
const DialogForm = ({ id, titulo, descripcion, cancel = true, children, buttons }:
    {
        id: string,
        titulo?: string,
        descripcion?: string,
        cancel?: boolean,
        children?: ReactNode,
        buttons?: ReactNode
    }) => {

    const dispatch = useDispatch();
    const [t] = useTranslation("global");
    const open = useSelector((state: IRootState) => {
        const dialog = state.dynamicDialogSlice.find(dialogA => dialogA.id === id);
        return dialog ? dialog.value : false;
    });

    return (
        <Dialog.Root open={open}>
            <Dialog.Content maxWidth="500px">
                {titulo &&
                    <Dialog.Title  >
                        <span dangerouslySetInnerHTML={{ __html: titulo }} />
                    </Dialog.Title>}
                {descripcion &&
                    <Dialog.Description  >
                        <span dangerouslySetInnerHTML={{ __html: descripcion }} />
                    </Dialog.Description>}
                {children}
                {pieDialogo({
                    cerrarDialogo: () => dispatch(hideDialogDinamico(id)),
                    textoAccion: t('acciones.cancelar'),
                    cancel: cancel,
                    buttons: buttons
                })}
            </Dialog.Content>
        </Dialog.Root>
    );
};

/**
 * Dialogo para alertas
 * 
 * @param id Identificador del dialogo
 * @param titulo Titulo del dialogo
 * @param descripcion Descripción del dialogo
 * @param cancel Indica si se muestra el botón de cancelar
 * @param alerta Tipo de alerta
 * @param children Contenido del dialogo
 * @param buttons Botones adicionales o unicos
 *
 */
const DialogAlertas = ({ id, titulo, descripcion, cancel = true, alerta, children, buttons }:
    {
        id: string,
        titulo: string,
        descripcion: string,
        cancel?: boolean,
        alerta: Alertas,
        children?: ReactNode,
        buttons?: ReactNode
    }) => {

    const dispatch = useDispatch();
    const [t] = useTranslation("global");
    const open = useSelector((state: IRootState) => {
        const dialog = state.dynamicDialogSlice.find(dialog => dialog.id === id);
        return dialog ? dialog.value : false;
    });

    return (
        <Dialog.Root open={open}>
            <Dialog.Content >
                {titulo &&
                    <Dialog.Title  >
                        <Flex gap="2" style={{ color: alertaColor({ alerta }) }}>
                            {alertaIconoSize({ alerta: alerta, size: "24" })}
                            <span dangerouslySetInnerHTML={{ __html: titulo }} />
                        </Flex>
                    </Dialog.Title>}
                {descripcion &&
                    <Dialog.Description  >
                        <span dangerouslySetInnerHTML={{ __html: descripcion }} />
                    </Dialog.Description>}
                {children}
                {pieDialogo({
                    cerrarDialogo: () => dispatch(hideDialogDinamico(id)),
                    textoAccion: t('acciones.cancelar'),
                    cancel: cancel,
                    buttons: buttons
                })}
            </Dialog.Content>
        </Dialog.Root>
    );
};

export { DialogForm, DialogAlertas };
