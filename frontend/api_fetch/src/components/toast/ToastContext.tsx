import { createContext } from "react";
import { Alerts } from "../../ConstantsPresentation";

/**
 * Contexto para un componente de Toast
 * 
 * @author omargo33
 * @since 2025-02-12
 * 
 */
interface ToastContextType {
    showToast: (title: string, description: string, alert: Alerts) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);
