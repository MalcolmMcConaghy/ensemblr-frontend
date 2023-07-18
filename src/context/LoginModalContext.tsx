import { ReactElement, createContext, useMemo, useState } from "react";

export const ModalContext = createContext({});

export default function ModalProvider({
  children,
}: {
  children: ReactElement;
}) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isLoginModalOpen, setIsLoginModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
}
