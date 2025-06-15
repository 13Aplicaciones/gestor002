/**
 * Interface para el objeto de datos de un ComboItem.
 */
interface IRowDataComboItem {
    uuid: string;
    indexComboItem: string;
    uuidCombo: string;
    label: string;
    description: string;
    codeNumber: number;
    codeText: string;
    icon: string;
    color: string;
    orden: number;
    status: string;
    user: string;
    userDate: string;
    userApp: string;
    }   


/**
 * Función para crear un objeto de datos de ComboItem vacío.
 * 
 * @returns 
 */
const createIRowDataComboItem = (): IRowDataComboItem => {
  return {
    uuid: "",
    indexComboItem: "",
    uuidCombo: "",
    label: "",
    description: "",
    codeNumber: 0,
    codeText: "",
    icon: "",
    color: "",
    orden: 0,
    status: "",
    user: "",
    userDate: "",
    userApp: ""
  };
};

export { createIRowDataComboItem };
export type { IRowDataComboItem };