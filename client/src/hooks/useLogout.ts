import { useNavigate } from "react-router-dom";
import guardianAsyncWrapper from "../app/guardianAsyncWrapper"
import useLocalStorage from '../utility/localStorage';
import { toast } from "react-toastify";
import React from "react";

type FunctionType = React.Dispatch<React.SetStateAction<boolean>>
export const useLogout = (userId: string, setOpenSidebarModal: FunctionType) => {
  const navigate = useNavigate();

  const logout = () => {
    guardianAsyncWrapper(async () => {
      useLocalStorage.clearStorage();
      toast.info('Logout successful!')
      setOpenSidebarModal(false);
      navigate('/');
    });
  }
  return logout;
}