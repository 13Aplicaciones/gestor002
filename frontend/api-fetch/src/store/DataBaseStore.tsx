/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Manejo de base de datos indexada
 * 
 * @author omargo33
 * @since 2025-03-01
 * 
 */

/**
 * Funcion para abrir la base de datos o crearla si no existe.
 * 
 * El esquema de la base de datos se define en el objeto database es:
 * 
 * {
    db: "app13",
    stores: [
        { name: "structure" },
        { name: "token" },
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
    },
 * 
 * @param storeName 
 * @returns 
 */
const openDatabase = (database: any) => {
    return new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open(database.db, 1);

        request.onupgradeneeded = (event) => {
            const db = request.result;
            database.stores.forEach((store: any) => {
                if (!db.objectStoreNames.contains(store.name)) {
                    db.createObjectStore(store.name, { keyPath: 'id' });
                    console.info(`ObjectStore ${store.name} created ${event}`);
                }
            });
        };

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = (event) => {
            reject(event);
        };
    });
};

/**
 * Funcion para agregar datos a la base de datos indexada con su respectivo id
 * 
 * @param storeName nombre de la tabla
 * @param id id del registro para poder ser ubicado en la tabla
 * @param data datos a guardar
 * @returns
 */
const addDataToIndexedDB = async (database: any, ddl: string,  index?: string, data?: any, ) => {

    const db = await openDatabase(database);
    const transaction = db.transaction(ddl, 'readwrite');
    const store = transaction.objectStore(ddl);
    const id = database.ddl[ddl].id + (index ? '_' + index : '');

    if (id) {
        data.id = id;
    }

    store.put(data);
    return new Promise<void>((resolve, reject) => {
        transaction.oncomplete = () => {
            resolve();
        };
        transaction.onerror = (event) => {
            reject(event);
        };
    });
};


//TODO: Validar si index se necesita en esta funcion
/**
 * Funcion para guardar datos en la base de datos indexada
 * 
 * @param storeName 
 * @param data 
 * @returns 
 */
const saveDataToIndexedDB = async (database: any, ddl: string, data: any) => {
    const db = await openDatabase(database);
    const transaction = db.transaction(ddl, 'readwrite');
    const store = transaction.objectStore(ddl);
    store.put(data);
    return new Promise<void>((resolve, reject) => {
        transaction.oncomplete = () => {
            resolve();
        };
        transaction.onerror = (event) => {
            reject(event);
        };
    });
};

/**
 * Funcion para obtener datos de la base de datos indexada
 * 
 * @param storeName 
 * @param id 
 * @returns 
 */
const getDataFromIndexedDB = async (database: any, ddl: string, index?: string) => {
    const db = await openDatabase(database);
    const transaction = db.transaction(ddl, 'readonly');
    const store = transaction.objectStore(ddl);
    const id = database.ddl[ddl].id + (index ? '_' + index : '');
    
    return new Promise<any>((resolve, reject) => {
        const request = store.get(id);
        request.onsuccess = () => {
            resolve(request.result);
        };
        request.onerror = (event) => {
            reject(event);
        };
    });
};

/**
 * Funcion para eliminar datos de la base de datos indexada
 * 
 * @param storeName 
 * @param id 
 * @returns 
 */
const deleteDataById = async (database: any, ddl: string, index?: string) => {
    const db = await openDatabase(database);
    const transaction = db.transaction(ddl, 'readwrite');
    const store = transaction.objectStore(ddl);
    const id = database.ddl[ddl].id + (index ? '_' + index : '');
   
    return new Promise<void>((resolve, reject) => {
        const request = store.delete(id);
        request.onsuccess = () => {
            resolve();
        };
        request.onerror = (event) => {
            reject(event);
        };
    });
};

export { addDataToIndexedDB, saveDataToIndexedDB, getDataFromIndexedDB, deleteDataById };
