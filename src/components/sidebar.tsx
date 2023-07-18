import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import Link from "./link";
import { SlHome, SlOrganization, SlPeople, SlUser } from "react-icons/sl";
import { useContext } from "react";
import { ModalContext } from "../context/LoginModalContext";

export default function Sidebar() {
  const { setIsLoginModalOpen } = useContext(ModalContext);
  const [open, setOpen] = useState(true);

  const isAuthenticated = false;

  return (
    <div className="min-h-screen flex flex-col w-72 antialiased bg-gray-50 text-gray-800">
      <div className="flex flex-col bg-dark-green h-full">
        <div className="flex items-center justify-center h-14">
          <div className="text-white text-3xl font-semibold">Ensemblr</div>
        </div>
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            <Link label="Home" icon={<SlHome />} />
            <Link label="Organizations" icon={<SlOrganization />} />
            <Link label="People" icon={<SlPeople />} />
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-white">
                  Settings
                </div>
              </div>
            </li>
            {isAuthenticated ? (
              <li
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-primary text-white hover:text-secondary border-l-4 border-transparent hover:border-secondary pr-6 hover:cursor-pointer"
                onClick={() => {
                  return;
                }}
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <SlUser />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Log out
                </span>
              </li>
            ) : (
              <li
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-primary text-white hover:text-secondary border-l-4 border-transparent hover:border-secondary pr-6 hover:cursor-pointer"
                onClick={() => setIsLoginModalOpen(true)}
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <SlUser />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Log in
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
