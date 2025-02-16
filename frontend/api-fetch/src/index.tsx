/* eslint-disable react-refresh/only-export-components */

/**
 * 
 * Exportar elementos de la libreria
 * 
 * @author @omargo33  
 * @since 2025-01-10
 * 
 * @see https://dlcastillop.com/blog/libreria-hooks-react
 */
export { alertIcon, alertIconSize, alertColor, alertColorBackground, alertVariant } from './components/IconosColoresAlerts';
export { Alerts, BandaPresentacion, Direccion } from './ConstantsPresentation.tsx';
export { BannerInformation, InformationPanelRegistration } from './components/callout/Information';
export { CreateSearchField } from './components/table/TableSearch';
export { DialogForm, DialogAlerts } from './components/dialog/Dialog';

export { fetchData } from './services/Api.tsx';
export { NotFound } from './pages/NotFound.tsx';

export { TableConfigurable } from './components/table/Table';



// Exportar elementos de la libreria para Toast
export { Toaster } from './components/toast/Toaster';
export { useToast } from './components/toast/Toast';

export { MiToastProvider } from './components/toast/MiToastProvider';
export { store } from './store/ConfigStore';
export { showToast } from "./store/ToastSlice";
export type { RootState, AppDispatch } from "./store/ConfigStore";