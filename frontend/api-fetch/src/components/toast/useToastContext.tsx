import { ToastContext } from './ToastContext';
import { useContext } from 'react';

/**
 * Hook para obtener el contexto de un componente de Toast
 * 
 * @author omargo33
 * @since 2025-02-12
 * 
 */
export const useToastContext = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToastContext must be used within a ToastProvider');
    }
    return context;
};
