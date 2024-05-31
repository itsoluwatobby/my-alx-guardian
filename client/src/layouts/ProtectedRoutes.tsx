import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGuardianContext } from "../hooks/useGuardianContext";

export default function ProtectedRoutes() {
  const { pathname } = useLocation();
  const { loggedInUserId } = useGuardianContext() as GuardianContextType;
  
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