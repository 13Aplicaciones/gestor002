import { alertColor } from "../IconosColoresAlerts";
import { Alerts, BandPresentation, Direccion, EstadoEdicion } from "../../ConstantsPresentation";
import { Badge, Flex } from "@radix-ui/themes";
import { EyeOpenIcon, LockClosedIcon, Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import useCalculatePresentation from "../input/Calculations";

/**
 * Funciones de presentation de pie en los formualrios y estos son resize.
 * 
 * @autor @omargo33
 * @since 2025-01-20
 * 
 */

/**
 * Funcion para orderar los botones en el pie de los formularios y espacio para los botones.
 * 
 * @param columns Columnas de la banda de presentación
 * @param directionLabel Dirección de la banda de presentación
 * @param children Botones a mostrar
 *  
 * @returns 
 */
const FooterForm = ({ columns, directionLabel, children }:
    { columns?: BandPresentation, directionLabel: Direccion | Direccion.horizontal, children?: ReactNode }) => {

    const presentation = useCalculatePresentation(directionLabel, columns, '60vw');

    return (
        <Flex direction={presentation.direction} gap="3" style={{ alignItems: presentation.align }}>
            <Flex width="calc(150px * var(--scaling))" style={{ justifyContent: presentation.justify }} />
            <Flex gap="2"  style={{ justifyContent: presentation.justify }} >
                {children}
            </Flex>
        </Flex>
    )
};

/**
 * Funcion para mostrar el estado de edición de los formularios.
 * 
 * @param statusEdit Estado de edición del formulario
 * @returns 
 */
const FormState = ({ statusEdit }: { statusEdit: EstadoEdicion }) => {
    const [t] = useTranslation("global");

    return (
        <Flex>
            {(statusEdit === EstadoEdicion.create) &&
                <Badge color={alertColor({ alert: Alerts.info })} radius="full" size="1" variant="soft">
                    <PlusIcon />{t('stateForm.create')}
                </Badge>
            }
            {(statusEdit === EstadoEdicion.edit) &&
                <Badge color={alertColor({ alert: Alerts.success })} radius="full" size="1" variant="soft">
                    <Pencil1Icon />{t('stateForm.edit')}
                </Badge>
            }
            {(statusEdit === EstadoEdicion.block) &&
                <Badge color={alertColor({ alert: Alerts.warning })} radius="full" size="1" variant="soft">
                    <LockClosedIcon />{t('stateForm.block')}
                </Badge>
            }
            {(statusEdit === EstadoEdicion.see) &&
                <Badge color={alertColor({ alert: Alerts.success })} radius="full" size="1" variant="soft"> 
                    <EyeOpenIcon />{t('stateForm.see')}
                </Badge>
            }
        </Flex>
    );
}

export { FormState, FooterForm };