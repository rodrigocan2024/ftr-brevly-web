import { createContext, type ReactNode } from "react";
import { type LinkStoreProps, useLinkStore } from "../stores/link";

type LinkContextProviderProps = {
  children: ReactNode;
};

export const LinkContext = createContext({} as LinkStoreProps);

export function LinkContextProvider({ children }: LinkContextProviderProps) {
  const linkStoreData = useLinkStore();

  return (
    <LinkContext.Provider value={linkStoreData}>
      {children}
    </LinkContext.Provider>
  );
}
