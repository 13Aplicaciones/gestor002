import { configureStore, createSlice } from "@reduxjs/toolkit";
import { number } from "prop-types";
import { boolean } from "yup";


/**
 * Componete para crear un field de busqueda.
 * 
 * @author @omargo33
 * @since 2025-01-15
 * 
 */

/**
 * perfilSlice entrada para contener el estado del perfil del usuario.
 * 
 */
const perfilSlice = createSlice({
    name: 'perfil',
    initialState: {
        id: '',
        tablas: {
            rowBanding: boolean,
            rowNumber: number
        }
    },
    reducers: {
        setPerfil: (state, action) => {
            state.id = action.payload.id;
            state.tablas = action.payload.tablas;
        },
        setTablas: (state, action) => {
            state.tablas = action.payload;
        }
    }
});
export const { setPerfil, setTablas } = perfilSlice.actions;

/**
 * dynamicDialogSlice entrada para contener el estado de presentation del diálogo por indice
 * 
 */
const dynamicDialogSlice = createSlice({
    name: 'dynamicDialog',
    initialState: [] as { id: string, value: boolean }[],
    reducers: {
        showDialogDinamico: (state, action) => {
            const item = state.find(dialog => dialog.id === action.payload);
            if (item) {
                item.value = true;
            } else {
                state.push({ id: action.payload, value: true });
            }
        },
        hideDialogDinamico: (state, action) => {
            const item = state.find(dialog => dialog.id === action.payload);
            if (item) {
                item.value = false;
            } else {
                state.push({ id: action.payload, value: false });
            }
        }
    }
});
export const { showDialogDinamico, hideDialogDinamico } = dynamicDialogSlice.actions;

/**
 * credencialSlice entrada para contener la credencial para los flujos de un api.
 *
 */
const credencialSlice = createSlice({
    name: 'credencial',
    initialState: [] as { id: string, token: string }[],
    reducers: {
        cargarCredencial: (state, action) => {
            const item = state.find(credencial => credencial.id === action.payload.id);
            if (item) {
                item.token = action.payload.token;
            } else {
                state.push({ id: action.payload.id, token: action.payload.token });
            }
        }
    }
});
export const { cargarCredencial } = credencialSlice.actions;

/**
 * store entrada para almacenar los reducers.
 */
const store = configureStore({
    reducer: {
        credencialSlice: credencialSlice.reducer,
        dynamicDialogSlice: dynamicDialogSlice.reducer,
        perfilSlice: perfilSlice.reducer,
    }
});
export default store;