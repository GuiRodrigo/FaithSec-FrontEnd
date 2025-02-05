import { Badge } from "@/components/ui/badge";
import { CallsType } from "@/pages/monitoramento_chamadas/columns";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<CallsType>[] = [
  {
    accessorKey: "data",
    header: "Dia",
    cell: ({ row }) => row.original.data,
  },
  {
    accessorKey: "professional",
    header: "Início da chamada",
    cell: ({ row }) => row.original.inicio,
  },
  {
    accessorKey: "termino",
    header: "Horário do Atendimento",
    cell: ({ row }) => row.original.termino,
  },
  // {
  //   accessorKey: "cpf_paciente",
  //   header: "Atendimentos",
  //   cell: ({ row }) => row.original.criticidade,
  // },
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
