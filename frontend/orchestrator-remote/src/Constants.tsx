export const STORE = {
    db: "13applications",
    stores: [
        { name: "structure" },
        { name: "token" },
        { name: "moduleSelect" },
        { name: "menuSelect" },
        { name: "parameters" },
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
    },
};