import { createContext, useState } from "react";

export const GuardianContext = createContext<GuardianContextType | null>(null);

export const GuardianDataProvider = ({ children }: Children) => {
  const [theme, setTheme] = useState<Theme>(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');


  const value = {
    theme, setTheme
  };
  return (
    <GuardianContext.Provider value={value}>
      {children}
    </GuardianContext.Provider>
  )
}