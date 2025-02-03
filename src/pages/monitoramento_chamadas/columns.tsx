import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CallsType = {
  id_calls: string;
  call_start: string;
  call_end?: string;
  criticality: "auxilio" | "emergencia";
  responsible: string;
  patient: string;
  bed: string;
  room: string;
};

export const columns: ColumnDef<CallsType>[] = [
  {
    accessorKey: "id_calls",
    header: "ID da chamada",
    cell: ({ row }) => row.original.id_calls,
  },
  {
    accessorKey: "call_start",
    header: "Inicio da Chamada",
    cell: ({ row }) => row.original.call_start,
  },
  {
    accessorKey: "call_end",
    header: "Fim da Chamada",
    cell: ({ row }) => row.original.call_end || <span>Em Andamento.</span>,
  },
  {
    accessorKey: "responsible",
    header: "Responsável",
    cell: ({ row }) =>
      row.original.responsible || <span>Responsável não enontrado.</span>,
  },
  {
    accessorKey: "bed",
    header: "Leito",
    cell: ({ row }) => row.original.bed,
  },
  {
    accessorKey: "room",
    header: "Quarto",
    cell: ({ row }) => row.original.room,
  },
  {
    accessorKey: "patient",
    header: "Paciente",
    cell: ({ row }) => row.original.patient,
  },
  {
    accessorKey: "criticality",
    header: "Criticidade",
    cell: ({ row }) => {
      const criticality = row.original.criticality;

      return (
        <Badge
          className={`${
            criticality != "emergencia" ? "bg-chart-4" : ""
          } text-center self-center`}
          variant={criticality === "emergencia" ? "destructive" : "default"}
        >
          {criticality === "emergencia" ? "EMERGÊNCIA" : "AUXÍLIO"}
        </Badge>
      );
    },
  },
];
