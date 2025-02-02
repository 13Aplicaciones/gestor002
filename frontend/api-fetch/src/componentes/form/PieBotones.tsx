import { Alertas, BandaPresentacion, Direccion, EstadoEdicion } from "../../ConstantesPresentacion";
import { Badge, Flex } from "@radix-ui/themes";
import { ReactNode } from "react";
import useCalcularPresentacion from "../input/Calculos";
import { EyeOpenIcon, LockClosedIcon, Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import { alertaColor } from "../IconosColoresAlertas";
import { useTranslation } from "react-i18next";

/**
 * Funciones de presentacion de pie en los formualrios y estos son resize.
 * 
 * @autor @omargo33
 * @since 2025-01-20
 * 
 */

/**
 * Funcion para ordenar los botones en el pie de los formularios y espacio para los botones.
 * 
 * @param columnas Columnas de la banda de presentación
 * @param direccionLabel Dirección de la banda de presentación
 * @param children Botones a mostrar
 *  
 * @returns 
 */
const FooterForm = ({ columnas, direccionLabel, children }:
    { columnas?: BandaPresentacion, direccionLabel: Direccion | Direccion.horizontal, children?: ReactNode }) => {

    const presentacion = useCalcularPresentacion(direccionLabel, columnas, '60vw');

    return (
        <Flex direction={presentacion.direccion} gap="3" style={{ alignItems: presentacion.alinear }}>
            <Flex width="calc(150px * var(--scaling))" style={{ justifyContent: presentacion.justificar }} />
            <Flex gap="2"  style={{ justifyContent: presentacion.justificar }} >
                {children}
            </Flex>
        </Flex>
    )
};

/**
 * Funcion para mostrar el estado de edición de los formularios.
 * 
 * @param estadoEdicion Estado de edición del formulario
 * @returns 
 */
const EstadoForm = ({ estadoEdicion }: { estadoEdicion: EstadoEdicion }) => {
    const [t] = useTranslation("global");

    return (
        <Flex>
            {(estadoEdicion === EstadoEdicion.crear) &&
                <Badge color={alertaColor({ alerta: Alertas.info })} radius="full" size="1" variant="soft">
                    <PlusIcon />{t('estadoForm.crear')}
                </Badge>
            }
            {(estadoEdicion === EstadoEdicion.editar) &&
                <Badge color={alertaColor({ alerta: Alertas.success })} radius="full" size="1" variant="soft">
                    <Pencil1Icon />{t('estadoForm.editar')}
                </Badge>
            }
            {(estadoEdicion === EstadoEdicion.bloquear) &&
                <Badge color={alertaColor({ alerta: Alertas.warning })} radius="full" size="1" variant="soft">
                    <LockClosedIcon />{t('estadoForm.bloquear')}
                </Badge>
            }
            {(estadoEdicion === EstadoEdicion.ver) &&
                <Badge color={alertaColor({ alerta: Alertas.success })} radius="full" size="1" variant="soft"> 
                    <EyeOpenIcon />{t('estadoForm.ver')}
                </Badge>
            }
        </Flex>
    );
}

export { EstadoForm, FooterForm };