import { createContext, useState } from "react";

export const GuardianContext = createContext<GuardianContextType | null>(null);

export const GuardianDataProvider = ({ children }: Children) => {
  const [theme, setTheme] = useState<Theme>(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const [showTitle, setShowTitle] = useState<boolean>(false);

  const value = {
    theme, setTheme, showTitle, setShowTitle
  };
  return (
    <GuardianContext.Provider value={value}>
      {children}
    </GuardianContext.Provider>
  )
}