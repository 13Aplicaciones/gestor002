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

// Exportar elementos de la libreria para Store redux
export { store } from './store/ConfigStore';
export { showDialogDinamico, hideDialogDinamico } from './store/DialogSlice';
export type { RootState, AppDispatch } from "./store/ConfigStore";

export {TypeBody, MethodREST} from './APIConstants';

// Exportar elementos de la libreria para servicios
export { fetchData } from './services/Api.tsx';
export { fetchRequestToken } from './services/Token.tsx';
export { createFetchData } from './services/Api.tsx';
export type { ICredencialKeycloak } from './services/Token.tsx';
export type { IFetchData } from './services/Api.tsx';