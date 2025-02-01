import {
  useContext,
  ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  isLogged: boolean;
  setUserData: Dispatch<SetStateAction<UserData | undefined>>;
  userData: UserData | undefined;
}

export interface UserData {
  username: string;
  password: string;
}

export const clientStorageKey = "@faith-sec-admin:user-data-1.0.0";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [userData, setUserData] = useState<UserData | undefined>();
  const isLogged = true;

  function retrieveLocalStorageInfo() {
    const storedStateAsJSON = localStorage.getItem(clientStorageKey);

    if (storedStateAsJSON) {
      const parsedData = JSON.parse(storedStateAsJSON);
      setUserData(parsedData);

      return;
    }

    setUserData(undefined);
  }

  useEffect(() => {
    retrieveLocalStorageInfo();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        setUserData,
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
