import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { differenceInMinutes } from "date-fns";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type CallsType = {
//   date?: string;
//   idChamada: string;
//   inicio: string;
//   termino?: string;
//   criticidade: "auxilio" | "emergencia";
//   responsavel: string;
//   cpf_paciente: string;
//   bed: string;
//   room: string;
// };

export type CallsType = {
  idChamada: number;
  responsavel: string;
  data: string; // ou 'Date', dependendo de como você deseja manipular a data
  criticidade: "Auxilio" | "Emergencia"; // Se for um conjunto fixo de valores
  inicio: string; // ou 'Date', se for para armazenar como Data
  termino: string; // ou 'Date', se for para armazenar como Data
  cpf_paciente: string;
  nfc_enfermeiro: string;
};

export const columns: ColumnDef<CallsType>[] = [
  {
    accessorKey: "idChamada",
    header: "ID da chamada",
    cell: ({ row }) => row.original.idChamada,
  },
  {
    accessorKey: "data",
    header: "Data",
    cell: ({ row }) => row.original.data,
  },
  {
    accessorKey: "inicio",
    header: "Inicio da Chamada",
    cell: ({ row }) => row.original.inicio,
  },
  {
    accessorKey: "termino",
    header: "Fim da Chamada",
    cell: ({ row }) => row.original.termino || <span>Em Andamento.</span>,
  },
  {
    id: "duracao",
    header: "Duração",
    cell: ({ row }) => {
      const { data, inicio, termino } = row.original;

      if (!termino) {
        return <span>Em Andamento</span>;
      }

      // Combina a data com o horário para formar um objeto Date
      const inicioDate = new Date(`${data}T${inicio}`);
      const terminoDate = new Date(`${data}T${termino}`);

      if (isNaN(inicioDate.getTime()) || isNaN(terminoDate.getTime())) {
        return <span>Data Inválida</span>;
      }

      // Calcula a diferença total em segundos
      const diffInSeconds = Math.floor(
        (terminoDate.getTime() - inicioDate.getTime()) / 1000
      );
      const hours = Math.floor(diffInSeconds / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);
      const seconds = diffInSeconds % 60;

      return (
        <span>
          {hours > 0 ? `${hours}h ` : ""}
          {minutes > 0 ? `${minutes}m ` : ""}
          {seconds}s
        </span>
      );
    },
  },
  {
    accessorKey: "responsavel",
    header: "Responsável",
    cell: ({ row }) =>
      row.original.responsavel || <span>Responsável não enontrado.</span>,
  },
  // {
  //   accessorKey: "bed",
  //   header: "Leito",
  //   cell: ({ row }) => row.original.bed,
  // },
  // {
  //   accessorKey: "room",
  //   header: "Quarto",
  //   cell: ({ row }) => row.original.room,
  // },
  {
    accessorKey: "cpf_paciente",
    header: "Paciente",
    cell: ({ row }) => row.original.cpf_paciente,
  },
  {
    accessorKey: "criticidade",
    header: "Criticidade",
    cell: ({ row }) => {
      const criticidade = row.original.criticidade;

      return (
        <Badge
          className={`${
            criticidade != "Emergencia" ? "bg-chart-4" : ""
          } text-center self-center`}
          variant={criticidade === "Emergencia" ? "destructive" : "default"}
        >
          {criticidade === "Emergencia" ? "EMERGÊNCIA" : "AUXÍLIO"}
        </Badge>
      );
    },
  },
];
