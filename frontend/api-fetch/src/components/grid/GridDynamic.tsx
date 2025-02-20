import { blackA } from "@radix-ui/colors";
import { Grid } from "@radix-ui/themes";
import { ReactNode } from "react";
import { whiteA } from "@radix-ui/colors";

/**
 * Componete de grid que se utiliza para mostrar los modulos en el dashboard
 * 
 * @author omargo33
 * @since 2024-02-19
 * 
 */

/**
 * Componente de grid que se utiliza para mostrar los modulos en el dashboard y tiene un estilo predefinido que se adapta a:
 * 
 * Tamaño de pantalla: xs, sm, md, lg, xl
 * Y al color de fondo y borde
 * 
 * @param children 
 */
const GridDashboard = ({ children, ...props }: { children?: ReactNode }) => {
    return (
        <Grid
            gap="4"
            p="4"
            columns={{ xs: "1", sm: "2", md: "3", lg: "3", xl: "4" }}
            style={{
                borderRadius: '8px',
                backgroundColor: whiteA.whiteA2,
                border: `1px solid ${blackA.blackA2}`,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}
            {...props}>
            {children}
        </Grid>
    );
}

export { GridDashboard };