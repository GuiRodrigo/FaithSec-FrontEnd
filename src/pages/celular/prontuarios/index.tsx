import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/router";
import api from "@/service/api";

export type PacienteType = {
  nome: string;
  idPaciente: string;
  datNasc: string; // Data de nascimento no formato "YYYY-MM-DD"
  rg: string;
  nmrCertidao: string; // Número da certidão com até 32 caracteres
  telefone1: string;
  telefone2: string;
  endereco: string;
  procedencia: string;
  pessoaRespon: string; // Pessoa responsável
  profissao: string;
  conjuge: string;
  nomeMae: string;
  nomePai: string;
  estadoCivil: string;
  cor: string;
  sexo: string;
  cpf: string; // CPF sem pontuação
};

export default function Prontuarios() {
  const [search, setSearch] = useState("");
  const [pacientes, setPacientes] = useState<PacienteType[] | []>([]);
  const [filteredPacientes, setFilteredPacientes] = useState<
    PacienteType[] | []
  >([]);
  const { setNourseData, setNourseLogin } = useAuth();
  const router = useRouter();
  const { nourseData } = useAuth();

  const handleFetch = () => {
    api
      .get("/pacientes")
      .then((res) => {
        setPacientes(res.data);
        setFilteredPacientes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (search !== "") {
      const newPacientes = pacientes.filter((paciente) =>
        paciente.nome.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredPacientes(newPacientes);
    } else {
      setFilteredPacientes(pacientes);
    }
  }, [search]);

  const handleClear = () => {
    setSearch("");
    handleFetch();
  };

  const handleLogOut = () => {
    setNourseData(undefined);
    setNourseLogin(undefined);
    router.push("/celular");
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-[#367ec2] flex flex-col gap-4">
      {/* Card do Enfermeiro */}
      <Card className="bg-[#f2f2f2] ">
        <CardContent>
          <p className="text-lg font-bold">{nourseData?.nome}</p>
          <p className="text-sm">Cargo: {nourseData?.cargo}</p>
        </CardContent>
      </Card>

      {/* Campo de busca */}
      <div className="flex gap-2">
        <Input
          placeholder="Buscar paciente"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button className="bg-destructive  font-bold" onClick={handleClear}>
          Limpar
        </Button>
      </div>

      {/* Lista de Pacientes */}
      <div className="mt-4 flex-1 overflow-y-auto max-h-[60vh] space-y-2">
        {filteredPacientes.map((paciente) => (
          <div
            onClick={() => {
              router.push(`prontuarios/${paciente.idPaciente}`);
            }}
            key={paciente.idPaciente}
            className="bg-[#d6d6d6] p-4 rounded-lg shadow-md cursor-pointer"
          >
            <h3 className="text-lg font-semibold">{paciente.nome}</h3>
            <p>Ala: {paciente.procedencia}</p>
          </div>
        ))}
      </div>

      {/* Botão de Logout */}
      <Button
        onClick={() => {
          handleLogOut();
        }}
        className="mt-4 bg-red-500 hover:bg-red-600"
      >
        Deslogar
      </Button>
    </div>
  );
}
