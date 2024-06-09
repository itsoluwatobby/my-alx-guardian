import { Navigate, Outlet, useLocation } from "react-router-dom";
import localStore from "../utility/localStorage";
import { useState } from "react";

export default function ProtectedRoutes() {
  const { pathname } = useLocation();
  const [loggedInUserId] = useState(localStore.getStorage('my-id'));
  
  return (
    <>
    {
      loggedInUserId ?
      <Outlet />
      : <Navigate to={'/signin'} state={pathname}/>
    }
    </>
  )
}