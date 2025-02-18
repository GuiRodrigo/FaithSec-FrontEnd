import api from "@/service/api";
import { useEffect, useState } from "react";

import { PacienteType } from "./index";
import { useRouter } from "next/router";

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
    <div className="min-h-screen p-6">
      <div className="p-4 bg-[#d6d6d6]">
        <h1 className="font-bold text-center text-xl">{paciente?.nome}</h1>
      </div>
      <div className="grid gap-4">
        <div className="flex justify-between mt-5">
          <span>
            <b>IDADE:</b> {calcularIdade(paciente?.datNasc ?? "")} anos
          </span>
          <span>
            <b>PESO:</b> 60kg
          </span>
        </div>
        <div>
          <span>
            <b>Alergias:</b> Sem comorbidades relevantes
          </span>
        </div>
        <div>
          <span>
            <b>TIPO SANGUINEO:</b> A+
          </span>
        </div>
        <div>
          <span>
            <b>MEDICAMENTOS ATUAIS:</b> Ibuprofeno (VO, 8/8 horas, para dor
            moderada), Soro fisiológico 0,9% (IV, 500 mL a cada 8 horas, para
            hidratação)
          </span>
        </div>
      </div>
    </div>
  );
}
