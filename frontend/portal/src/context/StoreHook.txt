import { useContext } from "react";
import { GlobalStoreContext, StructureStoreContext, UserStoreContext } from "./StoreContext";

export const useGlobalStore = () => {
  const context = useContext(GlobalStoreContext);
  if (context === undefined) {
    throw new Error('useGlobalStore must be used within a GlobalStoreProvider');
  }
  return context;
};

export const useStructureStore = () => {
  const context = useContext(StructureStoreContext);
  if (context === undefined) {
    throw new Error('useStructureStore must be used within a StructureStoreProvider');
  }
  return context;
};

export const useUserStore = () => {
  const context = useContext(UserStoreContext);
  if (context === undefined) {
    throw new Error('useUserStore must be used within a UserStoreProvider');
  }
  return context;
};

