import { createSlice } from "@reduxjs/toolkit"; 

/**
 * Componete para crear un toas.
 * 
 * @author @omargo33
 * @since 2025-02-15
 * 
 */

interface IToastState {
        value: boolean;
        title: string;
        description: string;
        alert: string;
}

const initialState: IToastState = {
    value: false,
    title: "",
    description: "",
    alert: ""
};

/**
 * toastSlice entrada para contener el estado de presentation del toast por indice
 *  
 */
const dynamicToastSlice = createSlice({
    name: 'dynamicToast',
    initialState,
    reducers: {
        showToast: (state, action) => {
            state.value = true;
            state.title = action.payload.title;
            state.description = action.payload.description;
            state.alert = action.payload.alert;
        },
        hideToast: (state) => {
            state.value = false;
            state.title = "";
            state.description = "";
            state.alert = "";
        }
    }
});
export const { showToast, hideToast } = dynamicToastSlice.actions;

export default dynamicToastSlice;
