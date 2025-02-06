import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type NourseType = {
  nfc: string;
  telefone1: string;
  telefone2: string;
  qtdAtend: number;
  nome: string;
  dataNasc: string;
  cargo: string;
  cpf: string;
  endereco: string;
  senha: string;
  estadoCracha: 'habilitado' | 'desabilitado';
  ala: 'UTI' | 'Internação Geral' | 'nenhum';
}

export const columns: ColumnDef<NourseType>[] = [
  {
    accessorKey: "nfc",
    header: "NFC",
    cell: ({ row }) => row.original.nfc,
  },
  {
    accessorKey: "nome",
    header: "Profissional",
    cell: ({ row }) => row.original.nome,
  },
  {
    accessorKey: "ala",
    header: "Ala",
    cell: ({ row }) => row.original.ala,
  },
  {
    accessorKey: "cargo",
    header: "Cargo",
    cell: ({ row }) => row.original.cargo,
  },
];
