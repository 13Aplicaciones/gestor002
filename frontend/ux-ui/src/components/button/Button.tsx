import { IconButton, Tooltip } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";
import { IconComponent } from "../icon/IconDynamic";

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
const ButtonCreateRecordFloating = ({
  disabled = false,
  onClick,
}: {
  disabled?: boolean;
  onClick?: () => void;
}) => {
  const [t] = useTranslation("global_ux");
  const message = t("actions.addDescription");

  if (disabled)
    return (
      <div style={{ position: "fixed", bottom: "2vh", right: "2vh" }}>
        <Tooltip content={message}>
          <IconButton
            disabled
            onClick={onClick}
            variant="solid"
            size="4"
            radius="full"
          >
            <IconComponent iconName="PlusIcon" width="16" height="16" />
          </IconButton>
        </Tooltip>
      </div>
    );
  return (
    <div style={{ position: "fixed", bottom: "2vh", right: "2vh" }}>
      <Tooltip content={message}>
        <IconButton onClick={onClick} variant="solid" size="4" radius="full">
          <IconComponent iconName="PlusIcon" width="16" height="16" />
        </IconButton>
      </Tooltip>
    </div>
  );
};

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
    <div style={{ position: "fixed", bottom: "2vh", left: "2vh" }}>
      <Tooltip content={t("actions.back")}>
        <IconButton onClick={onClick} variant="solid" size="4" radius="full">
          <IconComponent iconName="ArrowLeftIcon" width="16" height="16" />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export { ButtonBackFloating, ButtonCreateRecordFloating };
