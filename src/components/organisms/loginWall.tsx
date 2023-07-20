import { useContext } from "react";
import {
  ModalContext,
  ModalContextType,
} from "../../context/LoginModalContext";

export default function LoginWall() {
  const { setIsLoginModalOpen } = useContext(ModalContext) as ModalContextType;
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center space-y-6 py-4">
      <div>To access your organizations, please log in</div>
      <button
        type="button"
        className="group relative w-max flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2"
        onClick={() => setIsLoginModalOpen(true)}
      >
        Log in
      </button>
    </div>
  );
}
