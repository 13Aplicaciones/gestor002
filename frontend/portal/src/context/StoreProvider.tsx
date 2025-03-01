import { globalStore, State as GlobalState} from 'orchestrator_remote/globalStore';
import { structureStore, State as StructureState } from 'orchestrator_remote/structureStore';
import { userStore, State as UserState } from 'orchestrator_remote/userStore';

import { GlobalStoreContext, StructureStoreContext, UserStoreContext } from './StoreContext';
import { useState, useEffect } from 'react';

/**
 * Proveedor de contexto para el almacen global
 * 
 * @param children
 * @returns 
 */
export const GlobalStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [sharedGlobal, setSharedGlobal] = useState(globalStore.getState());

  useEffect(() => {
    const unsubscribe = globalStore.subscribe((state: GlobalState) => {
      setSharedGlobal(state);
    });

    return () => unsubscribe();
  }, []);

  return (
    <GlobalStoreContext.Provider value={sharedGlobal}>
      {children}
    </GlobalStoreContext.Provider>
  );
};

/**
 * Proveedor de contexto para el almacen de estructura
 * 
 * @param children
 * @returns 
 */
export const StructureStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [sharedStructure, setSharedStructure] = useState(structureStore.getState().sharedStructure);

  useEffect(() => {
    const unsubscribe = structureStore.subscribe((state:{sharedStructure: StructureState} ) => {
      setSharedStructure(state.sharedStructure);
    });

    return () => unsubscribe();
  }, []);

  return (
    <StructureStoreContext.Provider value={sharedStructure}>
      {children}
    </StructureStoreContext.Provider>
  );
};

/**
 * Proveedor de contexto para el almacen de usuario
 * 
 * @param children
 * @returns 
 */
export const UserStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [sharedUser, setSharedUser] = useState(userStore.getState());

  useEffect(() => {
    const unsubscribe = userStore.subscribe((state: UserState) => {
      setSharedUser(state);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserStoreContext.Provider value={sharedUser}>
      {children}
    </UserStoreContext.Provider>
  );
};