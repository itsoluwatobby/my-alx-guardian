// <reference guardian.ts>

type Children = {
  children: React.ReactNode;
}

type Theme = 'light' | 'dark';

type GuardianContextType = {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
}