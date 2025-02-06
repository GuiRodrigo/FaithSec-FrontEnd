import { CardProfile } from "@/components/compounds/CardProfile";
import { Drawer } from "@/components/compounds/Drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/router";

export default function Settings() {
  const router = useRouter();
  return (
    <div className="w-[100vw] max-w-[100vw] h-[100v] flex relative">
      <Drawer />
      <ScrollArea className="flex-1 h-[100vh]">
        <div className="w-full min-h-[100vh] flex  relative justify-center gap-6 items-center bg-primary ">
          <div className="gap-2 flex flex-col">
            <div className="border-2 p-4 rounded-xl w-[34vw] flex flex-col border-foreground">
              <span className="font-bold">ATUALIZAÇÃO</span>
              <span className="font-semibold">Atualização dos sistema Web</span>
            </div>
            <div className="border-2 p-4 rounded-xl w-[34vw] flex flex-col border-foreground">
              <span className="font-bold">CONTATO</span>
              <span className="font-semibold">
                Dúvidas? Problemas? Entre em contato com a FaithSec.
              </span>
            </div>
            <div className="border-2 p-4 rounded-xl w-[34vw] flex flex-col border-foreground">
              <span className="font-bold">IDIOMA</span>
              <span className="font-semibold">Idioma da região.</span>
            </div>
          </div>
          <div className="gap-2 flex flex-col">
            <div className="border-2 p-4 rounded-xl w-[34vw] flex flex-col border-foreground">
              <span className="font-bold">SENHA</span>
              <span className="font-semibold">Senha de acesso ao sistema.</span>
            </div>
            <div className="border-2 p-4 rounded-xl w-[34vw] flex flex-col border-foreground">
              <span className="font-bold">TEMA</span>
              <span className="font-semibold">Cores, tema.</span>
            </div>
            <div className="border-2 p-4 rounded-xl w-[34vw] flex flex-col border-foreground">
              <span className="font-bold">USUÁRIO</span>
              <span className="font-semibold">
                Informações, termos de uso e privacidade.
              </span>
            </div>
          </div>
        </div>
        <CardProfile />
      </ScrollArea>
    </div>
  );
}
