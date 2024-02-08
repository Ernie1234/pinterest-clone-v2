import { createContext, useContext } from "react";
import { TUser } from "../types/types";

export const UserContext = createContext<TUser | undefined>(undefined);

export function useUserContext() {
  const user = useContext(UserContext);
  if (user === undefined) throw new Error("userContext is not used");
  return user;
}
