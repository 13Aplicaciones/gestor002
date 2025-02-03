import "./styles.css"

import { alertColor, alertColorBackground } from "../IconosColoresAlerts";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Flex, IconButton } from "@radix-ui/themes";
import { Root, ToastProvider, ToastClose, ToastTitle, ToastDescription, ToastViewport } from "@radix-ui/react-toast"
import { useToast } from "./Toast"

/**
 * Funcion para mostrar los messages de alert
 * 
 * @returns 
 */
export function Toaster() {
    const { toasts } = useToast()
    return (
        <ToastProvider swipeDirection='right'>
            {toasts.map(({ id, title, description, action, alert, ...props }) => (
                <Root className={"ToastRoot"} style={{ backgroundColor: alertColorBackground(alert)}} key={id} {...props}>
                    <Flex p="0" direction="column">                        
                        {title &&
                            <ToastTitle className="ToastTitle">
                                <span dangerouslySetInnerHTML={{ __html: title }} />
                            </ToastTitle>}                        
                        {description &&
                            <ToastDescription>
                                <span dangerouslySetInnerHTML={{ __html: description }} />
                            </ToastDescription>}
                    </Flex>
                    {action}                    
                    <ToastClose >
                        <IconButton size="3" radius="full" variant="soft" color={alertColor({alert})}>
                            <Cross1Icon style={{ cursor: "pointer" }} width="16" height="16" />
                        </IconButton>
                    </ToastClose>
                </Root>
            ))}
            <ToastViewport className="ToastViewport" />
        </ToastProvider>
    )
}