/**
 * Interface for Combo Row Data
 */
interface IRowDataCombo {
  userDate: string;
  userApp: string;
  user: string;
  uuid: string;
  uuidModule: string;
  indexCombo: string;
  name: string;
  status: string;
}

/**
 * Create a new instance of IRowDataCombo
 *
 * @returns A new IRowDataCombo object
 */
const createIRowDataCombo = (): IRowDataCombo => {
  return {
    userDate: "",
    userApp: "",
    user: "",
    uuid: "",
    uuidModule: "",
    indexCombo: "",
    name: "",
    status: "A", // Default status is "A" (Active)
  };
};

export { createIRowDataCombo };
export type { IRowDataCombo };
