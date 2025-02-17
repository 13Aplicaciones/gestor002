import "./stylesDemo.css";
import { alertColor } from "../IconosColoresAlerts";
import { Alerts } from "../../ConstantsPresentation";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { Root, ToastProvider, ToastTitle, ToastDescription, ToastAction, ToastViewport } from "@radix-ui/react-toast";
import { ToastContext } from "./ToastContext";
import { useState, useEffect, ReactNode } from "react";

export const ToastContextProvider = ({ children }: { children: ReactNode }) => {
    
    const [alert, setAlert] = useState<Alerts>(Alerts.info);
    const [description, setDescription] = useState('Descripción');
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('title');

    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                setOpen(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [open]);

    const showToast = (newTitle: string, newDescription: string, newAlert: Alerts) => {
        setTitle(newTitle);
        setDescription(newDescription);
        setAlert(newAlert);
        setOpen(true);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            <ToastProvider swipeDirection="right">
                <Root className="ToastRoot" open={open} onOpenChange={setOpen} style={{ backgroundColor: alertColor({ alert: alert }) }}>
                    <ToastTitle className="ToastTitle" >
                        <span dangerouslySetInnerHTML={{ __html: title }} />
                    </ToastTitle>
                    <ToastDescription asChild className="ToastDescription">
                        <span dangerouslySetInnerHTML={{ __html: description }} />
                    </ToastDescription>
                    <ToastAction asChild altText="Goto schedule to undo">
                        <IconButton size="2" onClick={() => setOpen(false)} radius="full" variant="soft" >
                            <CrossCircledIcon width="3vh" height="3vh" />
                        </IconButton>
                    </ToastAction>
                </Root>
                <ToastViewport className="ToastViewport" />
            </ToastProvider>
            {children}
        </ToastContext.Provider>
    );
};
