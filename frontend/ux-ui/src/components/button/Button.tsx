import { ArrowLeftIcon, PlusIcon } from "@radix-ui/react-icons";
import { IconButton, Tooltip } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";

/**
 * Componete que representa los botones personalizados.
 * 
 * @autor @omargo33
 * @since 2025-01-20
 * 
 */

/**
 * Botón para crear un registro flotante
 * 
 * @param toolTip Mensaje que se muestra al pasar el mouse sobre el botón
 * @param disabled Indica si el botón está deshabilitado
 *  
 * @returns 
 */
const ButtonCreateRecordFloating = ({ toolTip, disabled = false, onClick }: {  toolTip: string, disabled?:boolean, onClick?: () => void }) => {
    const [t] = useTranslation("global_ux");
        
    if (disabled)
        return (
            <div style={{ position: 'fixed', bottom: '2vh', right: '2vh' }}>
                <Tooltip content={t("actions.addDescription", { description: toolTip })} side="top" align="center" sideOffset={5}>
                    <IconButton disabled onClick={onClick} variant="solid" size="4" radius="full" >
                        <PlusIcon />
                    </IconButton>
                </Tooltip>
            </div>
        )
    return (
        <div style={{ position: 'fixed', bottom: '2vh', right: '2vh' }}>
            <Tooltip content={t("actions.addDescription", { description: toolTip })} side="top" align="center" sideOffset={5}>
                <IconButton onClick={onClick} variant="solid" size="4" radius="full" >
                    <PlusIcon />
                </IconButton>
            </Tooltip>
        </div>
    )
}

/**
 * Botón para volver atrás flotante
 * 
 * @param onClick Función que se ejecuta al hacer click en el botón
 *  
 * @returns 
 */
const ButtonBackFloating = ({ onClick }: { onClick?: () => void }) => {
    const [t] = useTranslation("global_ux");

    return (
        <div style={{ position: 'fixed', bottom: '2vh', left: '2vh' }}>
            <Tooltip content={t("actions.back" )} side="top" align="center" sideOffset={5}>
                <IconButton onClick={onClick} variant="solid" size="4" radius="full" >
                    <ArrowLeftIcon />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export { ButtonBackFloating, ButtonCreateRecordFloating };