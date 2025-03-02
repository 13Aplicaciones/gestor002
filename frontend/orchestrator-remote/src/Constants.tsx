export const STORE = {
    db: "13applications",
    stores: [
        { name: "structure" },
        { name: "token" },
        { name: "moduleSelect" },
        { name: "menuSelect" },
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
    },
};