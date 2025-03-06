/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * El componente App de gestor_remote tiene un estructura generica para pasar argumentos.
 */
declare module "gestor_remote/App" {
    import React from 'react';

    interface AppProps {
        structure: any;
    }

    const App: React.ComponentType<AppProps>;
    export default App;
}