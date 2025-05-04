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

/**
 * API fetch
 */
export { createFetchData } from './services/Api.tsx';
export { fetchData } from './services/Api.tsx';
export { formatMessageJson } from './services/CommonAPI.tsx';
export { TypeBody, MethodREST } from './APIConstants';
export type { IFetchData } from './services/Api.tsx';

/**
 * Store de redux
 */
export { showDialogDinamico, hideDialogDinamico } from './store/DialogSlice';
export { addObject, deleteObject } from './store/ObjectSlice';
export { store } from './store/ConfigStore';
export type { RootState, AppDispatch } from "./store/ConfigStore";

/**
 * Storage de indexedDB
 */
export { addDataToIndexedDB, saveDataToIndexedDB, getDataFromIndexedDB, deleteDataById } from './store/DataBaseStore';
