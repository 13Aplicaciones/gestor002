declare module "marco_remote/EncabezadoWrapper" {
    import { ReactNode } from "react";

    interface EncabezadoProps {
        children?: ReactNode;
    }
    const EncabezadoWrapper: React.ComponentType<EncabezadoProps>;

    export default EncabezadoWrapper;
}

declare module "marco_remote/Encabezado" {
    import { ReactNode } from "react";

    interface EncabezadoProps {
        children?: ReactNode;
    }

    const Encabezado: React.ComponentType<EncabezadoProps>;

    export default Encabezado;
}

declare module "marco_remote/Pie" {
    const Pie: React.ComponentType;
    export default Pie;
}
