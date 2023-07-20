import { Outlet } from "react-router-dom";
import Sidebar from "../components/organisms/sidebar";
import { ModalContext, ModalContextType } from "../context/LoginModalContext";
import { useContext } from "react";
import LoginModal from "../components/organisms/loginModal";

export default function Layout() {
  const { isLoginModalOpen } = useContext(ModalContext) as ModalContextType;

  return (
    <>
      <div className="flex bg-bone-white">
        <Sidebar />
        <div className="px-12 py-6">
          <Outlet />
        </div>
      </div>
      {isLoginModalOpen && <LoginModal />}
    </>
  );
}
