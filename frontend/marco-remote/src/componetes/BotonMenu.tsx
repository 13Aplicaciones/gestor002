import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { IconButton, Tooltip } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";

const BotonMenu = () => {

    const [t] = useTranslation("global");

    return (
        <Tooltip content={t("boton_menu.tooltip")}>
            <IconButton radius="full" size="3" variant="ghost">
                <HamburgerMenuIcon width="22" height="22" />
            </IconButton>
        </Tooltip>
    );
}

export default BotonMenu;