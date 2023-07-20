import { ReactElement, createContext, useState } from "react";

export type User = {
  name: string;
  email: string;
};

export type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export default function UserProvider({ children }: { children: ReactElement }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
