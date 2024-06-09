import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import localStore from "../utility/localStorage";

type GuardianWrapperProps = {
  setOpenSidebarModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function GuardianWrapper({ setOpenSidebarModal }: GuardianWrapperProps) {
  const [loggedInUserId] = useState(localStore.getStorage('my-id'));
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const AuthRoutes = ['/signIn', '/signin', '/signup', '/forgotPassword', '/newPassword'];
    if (loggedInUserId && AuthRoutes.includes(pathname)) {
      navigate(-1);
    }
  }, [loggedInUserId, pathname, navigate])

  return (
    <div className="flex flex-col w-full h-full px-16 maxmobile:px-1 lg:px-24">
      <Navbar setOpenSidebarModal={setOpenSidebarModal} />
      <Outlet />
    </div>
  )
}
