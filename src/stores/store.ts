import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import UserStore from "./userStore";

interface Store {
  commonStore: CommonStore;
  userStore: UserStore;
}

export const store: Store = {
  commonStore: new CommonStore(),
  userStore: new UserStore()
};

export const StoresContext = createContext(store);

export function useStores() {
  return useContext(StoresContext);
}