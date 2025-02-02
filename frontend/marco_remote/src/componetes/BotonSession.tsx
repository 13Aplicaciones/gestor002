import { Button, DropdownMenu } from "@radix-ui/themes";
import { PersonIcon } from "@radix-ui/react-icons"
import { useTranslation } from "react-i18next";

/**
 * Boton de sesión que muestra el nombre del usuario y un menú desplegable con opciones de usuario.
 * 
 * @param param0 
 * @returns
 * 
 */
const BotonSession = ({ userName }: { userName?: string }) => {
    const [t] = useTranslation("global");
    const displayName = userName || t("boton_sesion.invitado");
    
    if (!userName) {
        return (
            <Button size="2" variant="soft" disabled>
                <PersonIcon />{displayName}
            </Button>
        );
    }
    
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Button size="2" variant="soft" onClick={(e) => e.preventDefault()}>
                    <PersonIcon />{displayName}
                    <DropdownMenu.TriggerIcon />
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.Item>
                {t("boton_sesion.mi_cuenta")}</DropdownMenu.Item>
                <DropdownMenu.Item>{t("boton_sesion.mi_caja")}</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger>{t("boton_sesion.auditoria")}</DropdownMenu.SubTrigger>
                    <DropdownMenu.SubContent>
                        <DropdownMenu.Item>{t("boton_sesion.inicios")}</DropdownMenu.Item>
                        <DropdownMenu.Item>{t("boton_sesion.eventos")}</DropdownMenu.Item>
                    </DropdownMenu.SubContent>
                </DropdownMenu.Sub>
                <DropdownMenu.Separator />
                <DropdownMenu.Item color="red">
                    {t("boton_sesion.cerrar")}
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}

export default BotonSession;
