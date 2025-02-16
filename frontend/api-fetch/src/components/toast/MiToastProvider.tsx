import "./stylesDemo.css";
import { Button } from "@radix-ui/themes";
import { Root, ToastProvider, ToastTitle, ToastDescription, ToastAction, ToastViewport } from "@radix-ui/react-toast";
import { useState, useEffect, createContext, useContext, ReactNode } from "react";



interface ToastContextType {
    showToast: (title: string, description: string, alert: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);


export const useToastContext = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToastContext must be used within a ToastProvider');
    }
    return context;
};

export const ToastContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('title');
    const [description, setDescription] = useState('Descripción');
    const [alert, setAlert] = useState('error');

    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                setOpen(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [open]);

    const showToast = (newTitle: string, newDescription: string, newAlert: string) => {
        setTitle(newTitle);
        setDescription(newDescription);
        setAlert(newAlert);
        setOpen(true);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            <ToastProvider swipeDirection="right">
                <Root className="ToastRoot" open={open} onOpenChange={setOpen}>
                    <ToastTitle>{title}</ToastTitle>
                    <ToastDescription asChild>
                        <span>{description + '--' + alert}</span>
                    </ToastDescription>
                    <ToastAction asChild altText="Goto schedule to undo">
                        <Button onClick={() => setOpen(false)}>close</Button>
                    </ToastAction>
                </Root>
                <ToastViewport className="ToastViewport" />
            </ToastProvider>
            {children}
        </ToastContext.Provider>
    );
};