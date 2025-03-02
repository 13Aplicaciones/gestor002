/* eslint-disable @typescript-eslint/no-explicit-any */


//TODO se debe poner processos de encriptacion y desencriptacion de datos asincronos.

/**
 * Manejo de base de datos indexada
 * 
 * @author omargo33
 * @since 2025-03-01
 * 
 */

/**
 * Funcion para abrir la base de datos o crearla si no existe
 * 
 * @param storeName 
 * @returns 
 */
const openDatabase = () => {
    return new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open("app13", 1);

        request.onupgradeneeded = (event) => {
            const db = request.result;
            if (!db.objectStoreNames.contains("structure")) {
                db.createObjectStore("structure", { keyPath: 'id' });
                console.info("ObjectStore created " + event);
            }
            if (!db.objectStoreNames.contains("token")) {
                db.createObjectStore("token", { keyPath: 'id' });
                console.info("ObjectStore created " + event);
            }
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
const addDataToIndexedDB = async ( storeName: string, id: string,  data: any) => {
    const db = await openDatabase( );
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
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

/**
 * Funcion para guardar datos en la base de datos indexada
 * 
 * @param storeName 
 * @param data 
 * @returns 
 */
const saveDataToIndexedDB = async ( storeName:string,  data: any) => {
    const db = await openDatabase( );
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
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
const getDataFromIndexedDB = async (storeName:string, id: string) => {
    const db = await openDatabase();
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
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
const deleteDataById = async (storeName:string, id: string) => {
    const db = await openDatabase();
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
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

export {addDataToIndexedDB, saveDataToIndexedDB, getDataFromIndexedDB, deleteDataById };
