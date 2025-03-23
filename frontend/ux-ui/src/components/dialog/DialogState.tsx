import "../../i18n";
import { alertColor, alertIconSize } from "../IconosColoresAlerts";
import { Alerts } from "../../ConstantsPresentation";
import { Button, Dialog, Flex, Separator } from "@radix-ui/themes";
import { ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Funciones de presentation de Dialogos.
 *
 * @autor @omargo33
 * @since 2025-01-20
 *
 */

/**
 * Pie del dialogo que permite cerrar el dialogo o tener botones adicionales o unicos.
 *
 * @param closeDialogue Función para cerrar el dialogo
 * @param textAction Texto del botón de acción
 * @param cancel Indica si se muestra el botón de cancelar
 * @param buttons Botones adicionales o unicos
 * @returns
 */
const footDialogue = ({
  closeDialogue,
  textAction,
  cancel = true,
  buttons,
}: {
  closeDialogue: () => void;
  textAction: string;
  cancel?: boolean;
  buttons?: ReactNode;
}) => {
  return (
    <>
      {buttons && (
        <Flex direction="column" align="end">
          <Separator my="3" size="4" />
          <Flex direction="row" align="baseline" gap="2">
            {buttons}
            {cancel && (
              <Button size="3" variant="solid" onClick={closeDialogue}>
                {textAction}
              </Button>
            )}
          </Flex>
        </Flex>
      )}
      {!buttons && cancel && (
        <Flex direction="column" align="end">
          <Separator my="3" size="4" />
          <Flex direction="row" align="baseline" gap="2">
            <Button size="3" variant="solid" onClick={closeDialogue}>
              {textAction}
            </Button>
          </Flex>
        </Flex>
      )}
    </>
  );
};

/**
 * Dialogo para formularios
 *
 * @param id Identificador del dialogo
 * @param title Titulo del dialogo
 * @param description Descripción del dialogo
 * @param cancel Indica si se muestra el botón de cancelar
 * @param children Contenido del dialogo
 * @param buttons Botones adicionales o unicos
 *
 */
const DialogForm = ({
  status,
  title,
  description,
  cancel = true,
  children,
  buttons,
}: {
  status: boolean;
  title?: string;
  description?: string;
  cancel?: boolean;
  children?: ReactNode;
  buttons?: ReactNode;
}) => {
  const [t] = useTranslation("global_ux");
  const [open, setOpen] = useState(status);

  useEffect(() => {
    console.log("DialogForm", status);
    setOpen(status);
  }, [status]);

  return (
    <Dialog.Root open={open}>
      <Dialog.Content maxWidth="500px">
        {title && (
          <Dialog.Title>
            <span dangerouslySetInnerHTML={{ __html: title }} />
          </Dialog.Title>
        )}
        {description && (
          <Dialog.Description>
            <span dangerouslySetInnerHTML={{ __html: description }} />
          </Dialog.Description>
        )}
        {children}
        {footDialogue({
          closeDialogue: () => setOpen(!open),
          textAction: t("actions.cancel"),
          cancel: cancel,
          buttons: buttons,
        })}
      </Dialog.Content>
    </Dialog.Root>
  );
};

/**
 * Dialogo para alerts
 *
 * @param id Identificador del dialogo
 * @param title Titulo del dialogo
 * @param description Descripción del dialogo
 * @param cancel Indica si se muestra el botón de cancelar
 * @param alert Tipo de alert
 * @param children Contenido del dialogo
 * @param buttons Botones adicionales o unicos
 *
 */
const DialogAlerts = ({
  status,
  title,
  description,
  cancel = true,
  alert,
  children,
  buttons,
}: {
  status: boolean;
  title: string;
  description: string;
  cancel?: boolean;
  alert: Alerts;
  children?: ReactNode;
  buttons?: ReactNode;
}) => {
  const [t] = useTranslation("global_ux");
  const [open, setOpen] = useState(status);

  return (
    <Dialog.Root open={open}>
      <Dialog.Content>
        {title && (
          <Dialog.Title>
            <Flex gap="2" style={{ color: alertColor({ alert }) }}>
              {alertIconSize({ alert: alert, size: "24" })}
              <span dangerouslySetInnerHTML={{ __html: title }} />
            </Flex>
          </Dialog.Title>
        )}
        {description && (
          <Dialog.Description>
            <span dangerouslySetInnerHTML={{ __html: description }} />
          </Dialog.Description>
        )}
        {children}
        {footDialogue({
          closeDialogue: () => setOpen(!open),

          textAction: t("actions.cancel"),
          cancel: cancel,
          buttons: buttons,
        })}
      </Dialog.Content>
    </Dialog.Root>
  );
};

/*
interface IToeastDialog {
  key : string;
  status: boolean;
  message: string;
  alert: Alerts;
  duration?: number;
  onClose?: () => void;
}

export const createIToasDialog = (): IToeastDialog => {
  return {
    key : "",
    status: true,
    message: "",
    alert: Alerts.info,
    duration: 3000,
    onClose: () => {},
  };
};
*/
/**
 * Componente ToastDialog para mostrar mensajes en una esquina de la pantalla.
 *
 * @param status Indica si el toast está visible
 * @param message Mensaje a mostrar en el toast
 * @param alert Tipo de alerta (para colores e íconos)
 * @param duration Duración en milisegundos antes de que se cierre automáticamente
 * @param onClose Callback cuando el toast se cierra
 */
const ToastDialog = ({
  status,
  message,
  alert,
  duration = 3000,
  onClose,
}: {
  status: boolean;
  message: string;
  alert: Alerts;
  duration?: number;
  onClose?: () => void;
}) => {
  const [visible, setVisible] = useState(status);

  useEffect(() => {
    if (status) {
      setVisible(true); // Muestra el toast cuando el estado cambia a true
      const timer = setTimeout(() => {
        setVisible(false); // Oculta el toast después de la duración
        if (onClose) onClose();
      }, duration);

      return () => clearTimeout(timer); // Limpia el temporizador al desmontar o actualizar
    } else {
      setVisible(false); // Oculta el toast si el estado cambia a false
    }
  }, [status, duration, onClose]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "10px 20px",
        backgroundColor: alertColor({ alert }),
        color: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease-in-out",
        zIndex: 1000,
      }}
    >
      <Flex gap="2" align="center">
        {alertIconSize({ alert, size: "24" })}
        <span>{message}</span>
      </Flex>
    </div>
  );
};

export { DialogForm, DialogAlerts, ToastDialog };
