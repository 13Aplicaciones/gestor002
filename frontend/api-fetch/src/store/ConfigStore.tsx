import { configureStore } from "@reduxjs/toolkit";
import dynamicDialogSlice from "./DialogSlice";
import dynamicObjecSlice from "./ObjectSlice";

/**
 * Componete para exponer el store de redux.
 * 
 * @author @omargo33
 * @since 2025-01-15
 * 
 */

/**
 * store entrada para almacenar los reducers.
 */
const store = configureStore({
    reducer: {
        dynamicDialogSlice: dynamicDialogSlice.reducer,
        dynamicObjecSlice: dynamicObjecSlice.reducer
    }
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;