import { useEffect, useState } from "react";
import { BiMenu } from "react-icons/bi";
import Link from "./link";
import { SlHome, SlOrganization, SlPeople, SlUser } from "react-icons/sl";
import { useContext } from "react";
import { ModalContext, ModalContextType } from "../context/LoginModalContext";
import { UserContext, UserContextType } from "../context/UserContext";
import { AxiosData, request } from "../api/request";
import { useQuery } from "react-query";

type UserData = {
  name: string;
  email: string;
};

export default function Sidebar() {
  const { setIsLoginModalOpen } = useContext(ModalContext) as ModalContextType;
  const { user, setUser } = useContext(UserContext) as UserContextType;
  const [open, setOpen] = useState(true);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const getLogout = async () => {
    const { data } = await request<AxiosData<UserData>>({
      url: "/admin/logout",
    });

    return data;
  };

  const { error, data, refetch } = useQuery<UserData>("getLogout", getLogout, {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const logout = () => {
    void refetch();
  };

  useEffect(() => {
    if (!data || error) return;
    console.log(data);
    setUser(data);
  }, [data]);

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
            {user.email ? (
              <li
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-primary text-white hover:text-secondary border-l-4 border-transparent hover:border-secondary pr-6 hover:cursor-pointer"
                onClick={logout}
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
