/**
 * Definicion de estructura de la base de datos y los stores que se van a manejar en la aplicacion.
 * 
 * @author omargo33
 * @since 2025-04-12
 * 
 * La base de datos se llama 13applications y tiene los siguientes stores:
 */
export const STORE = {
    db: "13applications",
    stores: [
        { name: "structure" },
        { name: "token" },
        { name: "moduleSelect" },
        { name: "menuSelect" },
        { name: "parameters" },
        { name: "userDefinedCode" },
    ],
    ddl: {
        structure: {
            name: "structure",
            id: "modules"
        },
        token: {
            name: "token",
            id: "access"
        },
        moduleSelect: {
            name: "moduleSelect",
            id: "module"
        },
        menuSelect: {
            name: "menuSelect",
            id: "menu"
        },
        parameters: {
            name: "parameters",
            id: "module"
        },
        userDefinedCode: {
            name: "userDefinedCode",
            id: "module"
        },
    },
};