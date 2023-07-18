import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { ModalContext } from "../context/LoginModalContext";
import { useContext } from "react";
import LoginModal from "../components/loginModal";

export default function Layout() {
  const { isLoginModalOpen } = useContext(ModalContext);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
      {isLoginModalOpen && <LoginModal />}
    </>
  );
}
