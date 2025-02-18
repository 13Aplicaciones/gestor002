import { createSlice } from "@reduxjs/toolkit";

/**
 * Componete para crear una entrada para cada dialgo en pantalla.
 * 
 * @author @omargo33
 * @since 2025-01-15
 * 
 */

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

export const {showDialogDinamico, hideDialogDinamico } = dynamicDialogSlice.actions;

export default dynamicDialogSlice;
