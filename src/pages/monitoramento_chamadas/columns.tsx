import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

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
  criticidade: "auxilio" | "emergencia"; // Se for um conjunto fixo de valores
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
            criticidade != "emergencia" ? "bg-chart-4" : ""
          } text-center self-center`}
          variant={criticidade === "emergencia" ? "destructive" : "default"}
        >
          {criticidade === "emergencia" ? "EMERGÊNCIA" : "AUXÍLIO"}
        </Badge>
      );
    },
  },
];
