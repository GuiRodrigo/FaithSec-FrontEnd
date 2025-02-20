import api from "@/service/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PacienteType } from ".";
export default function Paciente() {
  const router = useRouter();
  const { id } = router.query;
  const [paciente, setPaciente] = useState<PacienteType>();

  const calcularIdade = (dataNascimento: string): number => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();
    const diaAtual = hoje.getDate();
    const diaNascimento = nascimento.getDate();

    // Verifica se ainda não fez aniversário este ano
    if (
      mesAtual < mesNascimento ||
      (mesAtual === mesNascimento && diaAtual < diaNascimento)
    ) {
      idade--;
    }

    return idade;
  };

  useEffect(() => {
    api
      .get(`/pacientes/${id}`)
      .then((res) => {
        console.log(res.data.datNasc);
        setPaciente(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      {/* Cabeçalho */}
      <div className="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-bold text-lg text-center flex-1">
          {paciente?.nome}
        </h1>
      </div>

      {/* Informações do Paciente */}
      <Card className="mt-6 p-4 space-y-4 bg-white shadow-md rounded-lg">
        <div className="flex justify-between text-sm font-medium">
          <span>
            <b>Idade:</b> {calcularIdade(paciente?.datNasc ?? "")} anos
          </span>
          <span>
            <b>Peso:</b> 60kg
          </span>
        </div>
        <div className="text-sm font-medium">
          <b>Telefone:</b> {paciente?.telefone1 ?? ""}
        </div>
        <div className="flex justify-between text-sm font-medium">
          <div className="text-sm font-medium">
            <b>Acompanhante:</b> {paciente?.pessoaRespon ?? ""}
          </div>
          <div className="text-sm font-medium">
            <b>Telefone:</b> (31) 97552-4070
          </div>
        </div>
        <div className="text-sm font-medium">
          <b>Alergias:</b> Sem comorbidades relevantes
        </div>
        <div className="text-sm font-medium">
          <b>Cor:</b> {paciente?.cor ?? ""}
        </div>
        <div className="text-sm font-medium">
          <b>Sexo:</b> {paciente?.sexo ?? ""}
        </div>
        <div className="text-sm font-medium">
          <b>Profissão:</b> {paciente?.profissao ?? ""}
        </div>
        <div className="text-sm font-medium">
          <b>Endereço:</b> {paciente?.endereco ?? ""}
        </div>
        <div className="text-sm font-medium">
          <b>Tipo Sanguíneo:</b> A+
        </div>
        <div className="text-sm font-medium">
          <b>Medicamentos Atuais:</b> Ibuprofeno (VO, 8/8 horas, para dor
          moderada), Soro fisiológico 0,9% (IV, 500 mL a cada 8 horas, para
          hidratação)
        </div>
      </Card>
    </div>
  );
}
