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
  { icon: "user_pen", title: "CADASTRO ENFERMEIRO" },
  { icon: "phone", title: "MONITORAMENTO CHAMADAS" },
  { icon: "nurse_monitoring", title: "MONITORAMENTO ENFERMEIROS" },
  { icon: "badge", title: "CRACHÁ HABLITAR/DESABILITAR" },
  { icon: "book", title: "MANUAL" },
  { icon: "settings", title: "CONFIGURAÇÕES" },
];

const icons: Record<string, LucideIcon> = {
  user_pen: UserPen,
  phone: PhoneCall,
  nurse_monitoring: Stethoscope,
  badge: IdCard,
  book: BookOpenText,
  settings: Settings,
};

type Item = {
  title: string;
  icon: keyof typeof icons; // Apenas chaves válidas do objeto `icons`
};

export function Drawer() {
  const { userData, setUserData } = useAuth();
  const router = useRouter();

  const [expanded, setExpanded] = useState(true);

  function renderDrawerItem({ icon, title }: Item) {
    const IconComponent = icons[icon];
    return (
      <div
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

  return (
    <div
      className={`flex z-50 flex-col relative transition-all duration-300 ease-in-out ${
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
