import { IPAdress } from "@/service/api";
import { useRouter } from "next/router";
import {
  useContext,
  ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { io } from "socket.io-client";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  setUserData: Dispatch<SetStateAction<UserData | undefined>>;
  setNourseLogin: Dispatch<SetStateAction<NourseLogin | undefined>>;
  setNourseData: Dispatch<SetStateAction<NourseData | undefined>>;
  nourseData: NourseData | undefined;
  userData: UserData | undefined;
  nourseLogin: NourseLogin | undefined;
  alterTable: boolean;
  setAlterTable: Dispatch<SetStateAction<boolean>>;
}

export interface UserData {
  id: number;
  cargo: string;
  nome?: string;
  cpf: string;
  senha: string;
}

export interface NourseLogin {
  cpf: string;
  password: string;
}

export interface NourseData {
  nfc: string;
  telefone1?: string;
  telefone2?: string;
  qtdAtend?: number;
  nome: string;
  senha: string;
  dataNasc?: string;
  cargo?: string;
  cpf?: string;
  endereco?: string;
  estadoCracha: "habilitado" | "desabilitado";
  ala: "UTI" | "Internação Geral" | "nenhum";
}

export const clientStorageKey = "@faith-sec-admin:user-data-1.0.0";
export const nourseStorageKey = "@faith-sec-admin:nourse-data-1.0.0";

// Criar a conexão do socket FORA do componente para evitar múltiplas conexões
const socket = io(`http://${IPAdress}:4000/`, {
  autoConnect: false, // Evita conexão automática, controlamos isso manualmente
});

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [userData, setUserData] = useState<UserData | undefined>();
  const [nourseData, setNourseData] = useState<NourseData | undefined>();
  const [nourseLogin, setNourseLogin] = useState<NourseLogin | undefined>();
  const [alterTable, setAlterTable] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (router.asPath.includes("celular")) {
      // Conectar apenas uma vez quando o AuthProvider for montado
      socket.connect();

      // Escutar evento do crachá
      const handleCrachaDesabilitado = () => {
        setNourseLogin(undefined);
        setNourseData(undefined);
        router.push("/celular/login");
        alert("Crachá desabilitado!");

        // Desconectar o socket e parar de escutar eventos
        // socket.disconnect();
      };

      socket.on("cracha-desabilitado", handleCrachaDesabilitado);

      return () => {
        // Limpar os eventos ao desmontar
        socket.off("cracha-desabilitado", handleCrachaDesabilitado);
      };
    }
  }, []);

  function retrieveLocalStorageInfo() {
    const storedStateAsJSON = localStorage.getItem(clientStorageKey);
    if (storedStateAsJSON) {
      setUserData(JSON.parse(storedStateAsJSON));
    } else {
      setUserData(undefined);
    }
  }

  function retrieveLocalStorageInfoNourse() {
    const storedStateAsJSONNourse = localStorage.getItem(nourseStorageKey);
    if (storedStateAsJSONNourse) {
      setNourseLogin(JSON.parse(storedStateAsJSONNourse));
    } else {
      setNourseLogin(undefined);
      setNourseData(undefined);
    }
  }

  useEffect(() => {
    retrieveLocalStorageInfo();
    retrieveLocalStorageInfoNourse();
  }, []);

  useEffect(() => {
    if (
      router.asPath?.includes("celular") &&
      !router.asPath?.includes("login")
    ) {
      if (nourseData?.nome) {
        router.push("/celular/login/nfc");
      } else {
        router.push("/celular/login");
      }
    } else {
    }
  }, [nourseData]);

  return (
    <AuthContext.Provider
      value={{
        setNourseData,
        nourseLogin,
        setNourseLogin,
        nourseData,
        setUserData,
        userData,
        alterTable,
        setAlterTable,
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
