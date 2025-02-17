import { Action, Close, Description, Root, Title, ToastProvider } from "@radix-ui/react-toast";
import { IconButton } from "@radix-ui/themes";

const DemoToast = ({ status }: { status: boolean }) => {

    return (
        <ToastProvider  swipeDirection="right">
            <Root asChild={false} duration={5000} open={status} style={{ backgroundColor: "green" }}>
                <Title  >
                    titulo generico
                </Title>
                <Description >
                    Descripción generica
                </Description>
                <Action altText="Hola" />
                <Close >
                    <IconButton >Cerrar
                    </IconButton>
                </Close>
            </Root>
        </ToastProvider>
    );
}

export default DemoToast;