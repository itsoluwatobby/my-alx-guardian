// <reference guardian.ts>

type Children = {
  children: React.ReactNode;
}

type Theme = 'light' | 'dark';

type GuardianContextType = {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
}

type Toggle = 'OPEN' | 'CLOSE'
type ExpandDetailsType = { id: string; toggle: Toggle; }

type FooterTypes = {
  name: string;
  subs: string[];
  subName?: string;
  platforms?: string[];
}

type ApiValue<T> = (string | number | boolean | T) | (string | number | boolean | T)[]
type SubApiRes = Record<string, ApiValue> | Record<string, ApiValue>[]

type ApiResponseType<E, K> = Record<(string | E), (K | SubApiRes)>

type AppStateType = {
  loading: boolean;
  isError: boolean;
  success: boolean;
  res: ApiResponseType;
}

type UserInfoType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type UserCredentialsType = Pick<UserInfoType, 'email' | 'password'>;

type TypingEvent = 'typing' | 'notTyping'
