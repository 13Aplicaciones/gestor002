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

export { DialogForm, DialogAlerts };
