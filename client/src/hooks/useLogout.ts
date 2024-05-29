import { useNavigate } from "react-router-dom";
import { guardianAsyncWrapper } from "../app/guardianAsyncWrapper"
import localStore from '../utility/localStorage';
import { toast } from "react-toastify";
import React from "react";
import { authenticationAPI } from "../app/api-calls/auth.api";

type FunctionType = React.Dispatch<React.SetStateAction<boolean>>
export const useLogout = (setOpenSidebarModal: FunctionType) => {
  const navigate = useNavigate();

  const logout = () => {
    guardianAsyncWrapper(async () => {
      const userId = localStore.getStorage('my-id') as string;
      localStore.clearStorage();
      await authenticationAPI.logout({ userId });
      toast.info('Logout successful!')
      setOpenSidebarModal(false);
      navigate('/');
    }, () => {});
  }
  return logout;
}