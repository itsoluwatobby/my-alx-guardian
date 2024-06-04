import { createContext, useEffect, useState } from "react";
import localStore from "../utility/localStorage";
import { guardianAsyncWrapper } from "../app/guardianAsyncWrapper";
import { userAPI } from "../app/api-calls/user.api";

export const GuardianContext = createContext<GuardianContextType | null>(null);

export const GuardianDataProvider = ({ children }: Children) => {
  const [theme, setTheme] = useState<Theme>(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const [showTitle, setShowTitle] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<Partial<PostType>>({});
  const [currentUser, setCurrentUser] = useState<Partial<UserType>>({});
  const [loggedInUserId, setLoggedInUserId] = useState(localStore.getStorage('my-id') as string);

  useEffect(() => {
    if(!loggedInUserId) return;
    guardianAsyncWrapper(async () => {
      const res = await userAPI.getUser(loggedInUserId);
      setCurrentUser(res.data)
    }, () => {});
  }, [loggedInUserId])

  const value = {
    theme, setTheme, showTitle, setShowTitle, loggedInUserId,setLoggedInUserId, currentUser, currentPost, setCurrentPost
  };
  return (
    <GuardianContext.Provider value={value}>
      {children}
    </GuardianContext.Provider>
  )
}