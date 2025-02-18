import { createContext } from "react";
import { Alerts } from "../../ConstantsPresentation";

interface ToastContextType {
    showToast001: (title: string, description: string, alert: Alerts) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

