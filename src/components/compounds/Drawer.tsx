import {
  Icon,
  PhoneCall,
  UserPen,
  Stethoscope,
  LucideIcon,
  IdCard,
  BookOpenText,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { clientStorageKey, useAuth } from "@/hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const drawerItens: Item[] = [
  { screen: "cadastro_enfermeiro", title: "CADASTRO ENFERMEIRO" },
  { screen: "monitoramento_chamadas", title: "MONITORAMENTO CHAMADAS" },
  { screen: "monitoramento_enfermeiro", title: "MONITORAMENTO ENFERMEIROS" },
  { screen: "cracha_hab_desab", title: "CRACHÁ HABLITAR/DESABILITAR" },
  { screen: "manual", title: "MANUAL" },
  { screen: "configuracoes", title: "CONFIGURAÇÕES" },
];

const screens: Record<string, LucideIcon> = {
  cadastro_enfermeiro: UserPen,
  monitoramento_chamadas: PhoneCall,
  monitoramento_enfermeiro: Stethoscope,
  cracha_hab_desab: IdCard,
  manual: BookOpenText,
  configuracoes: Settings,
};

type Item = {
  title: string;
  screen: keyof typeof screens; // Apenas chaves válidas do objeto `icons`
};

export function Drawer({ isExpanded = false }: { isExpanded?: boolean }) {
  const { userData, setUserData } = useAuth();
  const router = useRouter();

  const [expanded, setExpanded] = useState(isExpanded);

  function renderDrawerItem({ screen, title }: Item) {
    const IconComponent = screens[screen];
    return (
      <div
        onClick={() => {
          router.push(screen);
        }}
        className="flex cursor-pointer px-10 py-2 hover:bg-muted rounded-2xl gap-2 items-center"
        key={title}
      >
        {IconComponent && <IconComponent size={42} />}
        {expanded && (
          <span className="font-bold text-lg text-wrap text-center w-full">
            {title}
          </span>
        )}
      </div>
    );
  }

  function handleLogout() {
    setUserData(undefined);
    localStorage.removeItem(clientStorageKey);
    router.push("/");
  }

  useEffect(() => {
    const storageData = localStorage.getItem(clientStorageKey);
    if (!storageData && !userData) router.push("/"); // Caso não haja dados de usuário, redireciona para a página inicial
  }, [userData]);

  useEffect(() => {
    router.prefetch("/");
    router.prefetch("/home");
    router.prefetch("/manual");
    router.prefetch("/manual/sistema");
    router.prefetch("/manual/aplicativo");
    router.prefetch("/prontuarios");
    router.prefetch("/monitoramento_enfermeiro");
    router.prefetch("/monitoramento_chamadas");
    router.prefetch("/cadastro_enfermeiro");
    router.prefetch("/cracha_hab_desab");
    router.prefetch("/configuracoes");
  }, []);

  return (
    <div
      className={`flex z-50 flex-col py-10 relative transition-all duration-300 ease-in-out ${
        expanded ? "w-[25vw]" : "w-[10vw]"
      } h-[100vh] items-center justify-center border-r-2 border-foreground`}
    >
      <div
        onClick={() => {
          setExpanded(!expanded);
        }}
        className="absolute bg-background flex justify-center items-center h-[45px] w-[28px] cursor-pointer -right-[30px] top-10 border-t-2 border-r-2 border-b-2 border-foreground rounded-r-xl"
      >
        {expanded ? <ChevronLeft size={60} /> : <ChevronRight size={60} />}
      </div>
      <img
        onClick={() => {
          router.push("/home");
        }}
        src="logo_faithsec_nome.png"
        className="w-28 cursor-pointer"
        alt="logo faithsec"
      />
      <div className="gap-4 flex flex-col py-5">
        {drawerItens.map((item) => renderDrawerItem(item))}
      </div>

      <Button
        variant={"link"}
        onClick={() => {
          handleLogout();
        }}
        className="font-bold text-xl underline "
      >
        SAIR
      </Button>
    </div>
  );
}
