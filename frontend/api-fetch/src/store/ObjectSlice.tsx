import { createSlice } from "@reduxjs/toolkit";

/**
 * Componete para crear una entrada para cada objeto dinámico gemerico string (JSON).
 * 
 * @author @omargo33
 * @since 2025-01-15
 * 
 */

/**
 * dynamicObjecSlice entrada para contener el estado de presentation del objeto por indice
 */
const dynamicObjecSlice = createSlice({
    name: 'dynamicObject',
    initialState: [] as { id: string, value: string }[],
    reducers : {
        addObject: (state, action) => {
            const item = state.find(obj => obj.id === action.payload.id);
            if (item) {
                item.value = action.payload.value;
            } else {
                state.push({ id: action.payload.id, value: action.payload.value });
            }
        },
        deleteObject: (state, action) => {
            const item = state.find(obj => obj.id === action.payload);
            if (item) {
                state.splice(state.indexOf(item), 1);
            }
        }
    }
});

export const { addObject, deleteObject } = dynamicObjecSlice.actions;

export default dynamicObjecSlice;