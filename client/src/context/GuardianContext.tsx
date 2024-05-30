import { createContext, useState } from "react";
import localStore from "../utility/localStorage";

export const GuardianContext = createContext<GuardianContextType | null>(null);

export const GuardianDataProvider = ({ children }: Children) => {
  const [theme, setTheme] = useState<Theme>(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const [showTitle, setShowTitle] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<Partial<PostType>>({});
  const [loggedInUserId] = useState(localStore.getStorage('my-id') as string);

  const value = {
    theme, setTheme, showTitle, setShowTitle, loggedInUserId, currentPost, setCurrentPost
  };
  return (
    <GuardianContext.Provider value={value}>
      {children}
    </GuardianContext.Provider>
  )
}