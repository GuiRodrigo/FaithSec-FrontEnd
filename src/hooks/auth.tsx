import { useContext, ReactNode, createContext } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  isLogged: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const isLogged = true;

  return (
    <AuthContext.Provider
      value={{
        isLogged,
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
