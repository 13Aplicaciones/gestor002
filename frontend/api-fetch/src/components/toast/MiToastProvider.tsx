import "./stylesDemo.css";
import { Button } from "@radix-ui/themes";
import { hideToast } from "../../store/ToastSlice";
import { RootState } from "../../store/ConfigStore";
import { Toast } from "radix-ui";
import { useDispatch, useSelector } from "react-redux";

/**
 * 
 * Exportar elementos de la libreria
 * 
 * @since 2025-01-10
 * 
 * @see https://dlcastillop.com/blog/libreria-hooks-react
 */
const MiToastProvider: React.FC = () => {
    const dispatch = useDispatch();
    
    let title = "title";
    let description = "Descripción";
    let alert= "error";

    
    const open = useSelector((state: RootState) => {
        const status = state.dynamicToastSlice.value;
        title = state.dynamicToastSlice.title;
        description = state.dynamicToastSlice.description;
        alert= state.dynamicToastSlice.alert;

        if (status) {
            setTimeout(() => {
                dispatch(hideToast());
            }, 5000);
        }

        return status;
    });

    return (
        <Toast.Provider swipeDirection='right'>
            <Toast.Root className="ToastRoot" open={open} >
                <Toast.Title >{title}</Toast.Title>
                <Toast.Description asChild>
                    {description + '--' + alert}
                </Toast.Description>
                <Toast.Action asChild altText="Goto schedule to undo">
                    <Button onClick={
                        () => {
                            dispatch(hideToast());
                        }}>
                        close
                    </Button>
                </Toast.Action>
            </Toast.Root>
            <Toast.Viewport className="ToastViewport" />
        </Toast.Provider>
    )
}

export { MiToastProvider };