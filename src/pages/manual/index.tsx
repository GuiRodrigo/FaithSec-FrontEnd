import { CardProfile } from "@/components/compounds/CardProfile";
import { Drawer } from "@/components/compounds/Drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/router";

export default function Manual() {
  const router = useRouter();
  return (
    <div className="w-[100vw] max-w-[100vw] h-[100v] flex relative">
      <Drawer />
      <ScrollArea className="flex-1 h-[100vh]">
        <div className="w-full min-h-[100vh] flex flex-col relative justify-center gap-6 items-center bg-primary ">
          <div
            onClick={() => {
              router.push("manual/sistema");
            }}
            className="p-10 bg-muted border border-foreground"
          >
            <span className="font-bold ">SISTEMA CHAMADA DE EMERGÊNCIA</span>
          </div>
          <div
            onClick={() => {
              router.push("manual/aplicativo");
            }}
            className="p-10 bg-muted border border-foreground"
          >
            <span className="font-bold ">
              APLICATIVO FAITHSEC - ENFERMEIRO E ADMINISTRATIVO
            </span>
          </div>
        </div>
        <CardProfile />
      </ScrollArea>
    </div>
  );
}
