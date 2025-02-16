import { configureStore } from "@reduxjs/toolkit";
import dynamicDialogSlice from "./DialogSlice";

/**
 * store entrada para almacenar los reducers.
 */
const store = configureStore({
    reducer: {
        dynamicDialogSlice: dynamicDialogSlice.reducer    }
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;