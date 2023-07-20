import { ReactElement, createContext, useState } from "react";

export const ModalContext = createContext<ModalContextType | null>(null);

export type ModalContextType = {
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (boolean: boolean) => void;
};

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
