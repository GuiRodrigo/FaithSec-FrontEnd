import { ChevronLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export default function System() {
  const router = useRouter();

  return (
    <div className="flex-1 bg-primary justify-center flex w-screen h-screen relative">
      {/* Botão Voltar */}
      <Button
        onClick={() => router.back()}
        variant="ghost"
        className="absolute top-5 left-5 z-10"
      >
        <ChevronLeft /> Voltar
      </Button>

      <ScrollArea className="h-screen flex flex-col items-center pt-20">
        {/* Título no topo */}
        <div className="p-5 w-[50vw] flex justify-center items-center bg-muted border border-foreground">
          <span className="text-center text-3xl font-semibold">
            SISTEMA DE CHAMADA DE EMERGÊNCIA
          </span>
        </div>

        {/* Bloco de texto formatado */}
        <div className="p-5 w-[50vw] bg-muted border border-foreground mt-5">
          <div className="space-y-2">
            {/* Linha 1: duas colunas */}
            <div className="flex justify-between">
              <span>titulo texto</span>
              <span>titulo texto</span>
            </div>
            {/* Linha 2: duas colunas */}
            <div className="flex justify-between">
              <span>titulo texto</span>
              <span>titulo texto</span>
            </div>
            {/* Linha 3: duas colunas */}
            <div className="flex justify-between">
              <span>titulo texto</span>
              <span>titulo texto</span>
            </div>
            {/* Linha 4: texto único centralizado */}
            <div className="flex justify-center">
              <span>titulo texto</span>
            </div>
            {/* Linha 5: texto único centralizado */}
            <div className="flex justify-center">
              <span>titulo texto</span>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
