import {
  Root,
  ToastAction,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@radix-ui/react-toast";
import { IconButton } from "@radix-ui/themes";
import { ReactNode, useEffect, useState } from "react";
import { Alerts } from "../../ConstantsPresentation";
import { IconComponent } from "../icon/IconDynamic";
import { alertColor, alertColorBackground } from "../IconosColoresAlerts";
import "./styles.css";
import { ToastContext } from "./ToastContext";

/**
 * Proveedor de contexto para un componente de Toast
 *
 * @author omargo33
 * @since 2025-02-12
 *
 */
export const ToastContextProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<Alerts>(Alerts.info);
  const [description, setDescription] = useState("description");
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("title");

  /**
   * Efecto para cerrar el Toast después de 5 segundos
   */
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  /**
   * Muestra un Toast
   *
   * @param newTitle
   * @param newDescription
   * @param newAlert
   */
  const showToast = (
    newTitle: string,
    newDescription: string,
    newAlert: Alerts
  ) => {
    setTitle(newTitle);
    setDescription(newDescription);
    setAlert(newAlert);
    setOpen(true);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <ToastProvider swipeDirection="right">
        <Root
          className="ToastRoot"
          open={open}
          onOpenChange={setOpen}
          style={{
            backgroundColor: alertColorBackground({ alert: alert }),
            borderColor: alertColor({ alert: alert }),
          }}
        >
          <ToastTitle className="ToastTitle">
            <span
              style={{ color: "black" }}
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </ToastTitle>
          <ToastDescription asChild className="ToastDescription">
            <span
              style={{ color: "black" }}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </ToastDescription>
          <ToastAction asChild altText="Close Toast">
            <IconButton
              variant="ghost"
              size="2"
              radius="full"
              onClick={() => setOpen(false)}
              style={{ color: "var(--black-10)" }}
            >
              <IconComponent iconName="Cross2Icon" width="16" height="16" />
            </IconButton>
          </ToastAction>
        </Root>
        <ToastViewport className="ToastViewport" />
      </ToastProvider>
      {children}
    </ToastContext.Provider>
  );
};
