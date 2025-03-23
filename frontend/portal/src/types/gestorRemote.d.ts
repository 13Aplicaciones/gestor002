/**
 * El componente App de gestor_remote tiene un estructura generica para pasar argumentos.
 */
declare module "gestor_remote/App" {
    import React from 'react';

    interface OrginProps {
        name: string;
    }

    const Orgin: React.ComponentType<OrginProps>;
    export default Orgin;
}