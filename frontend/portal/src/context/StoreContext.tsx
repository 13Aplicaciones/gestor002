import { createContext } from "react";

import { State as StateGlobal } from "orchestrator_remote/globalStore";
import { State as StateStructure } from "orchestrator_remote/structureStore";
import { State as StateUser } from "orchestrator_remote/userStore";

export const GlobalStoreContext = createContext<StateGlobal | undefined>(undefined);
export const StructureStoreContext = createContext<StateStructure | undefined>(undefined);
export const UserStoreContext = createContext<StateUser | undefined>(undefined);
