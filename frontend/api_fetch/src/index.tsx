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
// Exportar elementos de la libreria UI
export { alertIcon, alertIconSize, alertColor, alertColorBackground, alertVariant } from './components/IconosColoresAlerts';
export { Alerts, BandPresentation, Direccion } from './ConstantsPresentation.tsx';
export { BannerInformation, InformationPanelRegistration } from './components/callout/Information';
export { DialogForm, DialogAlerts } from './components/dialog/Dialog';

// Exportar elementos de la libreria para tabla
export { TableConfigurable } from './components/table/Table';
export { CreateSearchField } from './components/table/TableSearch';

// Exportar elementos de la libreria para Toast
export { ToastContextProvider  } from './components/toast/ToastContextProvider.tsx';
export { useToastContext } from './components/toast/useToastContext.tsx';

// Exportar elementos de la libreria Pages basicas
export { NotFound } from './pages/NotFound.tsx';

// Exportar elementos de la libreria para Store redux
export { store } from './store/ConfigStore';
export type { RootState, AppDispatch } from "./store/ConfigStore";

// Exportar elementos de la libreria para servicios
export { fetchData } from './services/Api.tsx';
