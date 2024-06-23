import { Navigate, Outlet, useLocation } from "react-router-dom";
import localStore from "../utility/localStorage";
import { useEffect, useState } from "react";

export default function ProtectedRoutes() {
  const { pathname } = useLocation();
  const [loggedInUserId, setLoggedInUserId] = useState('');

  useEffect(() => {
    setLoggedInUserId(localStore.getStorage('my-id') ?? '');
  }, [])
  
  return (
    <>
    {
      loggedInUserId.length > 1 ?
      <Outlet />
      : <Navigate to={'/signin'} state={pathname}/>
    }
    </>
  )
}