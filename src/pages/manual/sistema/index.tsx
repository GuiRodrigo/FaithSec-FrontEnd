import { ChevronLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export default function System() {
  const router = useRouter();

  return (
    <div className="relative p-5 min-h-screen" style={{ backgroundColor: "#28A45E" }}>
      {/* Botão Voltar */}
      <Button onClick={() => router.back()} variant="ghost" className="absolute top-5 left-5 z-10">
        <ChevronLeft className="mr-2" /> Voltar
      </Button>

      {/* Título no topo */}
      <h1 className="text-2xl font-bold text-center mt-10">APLICATIVO FAITHSEC - ENFERMEIRO E ADMINISTRATIVO</h1>

      {/* Bloco de texto formatado */}
      <ScrollArea className="mt-5 p-4 border rounded-lg bg-gray-100">
        <h2 className="text-xl font-semibold">CADASTRO DOS ENFERMEIROS</h2>
        <p>Um enfermeiro deve ser cadastrado no sistema para ter acesso à estrutura completa, incluindo o celular no posto de enfermagem e os crachás com identificador único.</p>
        <p>Antes de cadastrar um profissional, é necessário definir o identificador único, que será o número do celular fornecido pela FaithSec. Após obter esse número, finalize o cadastro normalmente. Não é necessário informar o número de cadastro ao profissional. O acesso ao sistema será realizado utilizando o CPF como usuário e a senha definida no momento do cadastro.</p>

        <h2 className="text-xl font-semibold mt-4">MONITORAMENTO DE CHAMADAS</h2>
        <p>O monitoramento das chamadas se baseia nos atendimentos dos enfermeiros e inclui: o dia, o início da chamada, o término, quem atendeu, qual a criticidade e o ID único da chamada.</p>

        <h2 className="text-xl font-semibold mt-4">MONITORAMENTO DE ENFERMEIROS</h2>
        <p>O monitoramento dos enfermeiros tem como objetivo registrar e acompanhar a quantidade de atendimentos realizados por cada profissional, permitindo uma análise precisa de sua performance e distribuição de tarefas.</p>

        <h2 className="text-xl font-semibold mt-4">CRACHÁ HABILITADO/DESABILITADO</h2>
        <p>Parte essencial e sensível do projeto: quando houver troca de turno e um profissional não estiver na instituição, seu acesso deve ser desabilitado. Isso inclui a finalização das chamadas com o crachá NFC e o acesso aos celulares com prontuário.</p>

        <h2 className="text-xl font-semibold mt-4">CONFIGURAÇÃO</h2>
        <p>Para facilitar o acesso à plataforma da FAITHSEC e garantir conformidade com os termos assinados ao adquirir o sistema, são oferecidas opções para alteração de senha e ajustes adicionais, otimizando o desempenho do sistema.</p>
      </ScrollArea>
    </div>
  );
}
