import { createContext, useContext } from "react";
import { Alerts } from "../../ConstantsPresentation";

interface ToastContextType {
    showToast: (title: string, description: string, alert: Alerts) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToastContext = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToastContext must be used within a ToastProvider');
    }
    return context;
};
