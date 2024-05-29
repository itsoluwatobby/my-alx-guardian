import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { useGuardianContext } from "../hooks/useGuardianContext";

type GuardianWrapperProps = {
  setOpenSidebarModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function GuardianWrapper({ setOpenSidebarModal }: GuardianWrapperProps) {
  const { setTheme, theme, showTitle } = useGuardianContext() as GuardianContextType;
  
  return (
    <div className="flex flex-col w-full h-full px-16 maxmobile:px-1">
       <Navbar 
        theme={theme} showTitle={showTitle}
        setTheme={setTheme}
        setOpenSidebarModal={setOpenSidebarModal}
      />

      <Outlet />
    </div>
  )
}