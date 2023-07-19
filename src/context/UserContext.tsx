import { ReactElement, createContext, useState } from "react";

export const UserContext = createContext({});

export default function UserProvider({ children }: { children: ReactElement }) {
  const [user, setUser] = useState({ name: "", email: "" });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
