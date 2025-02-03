import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type NourseType = {
  nfc: string;
  professional: string;
  role: string;
  services: string;
};

export const columns: ColumnDef<NourseType>[] = [
  {
    accessorKey: "nfc",
    header: "NFC",
    cell: ({ row }) => row.original.nfc,
  },
  {
    accessorKey: "professional",
    header: "Profissional",
    cell: ({ row }) => row.original.professional,
  },
  {
    accessorKey: "role",
    header: "Cargo",
    cell: ({ row }) => row.original.role,
  },
  {
    accessorKey: "services",
    header: "Atendimentos",
    cell: ({ row }) => row.original.services,
  },
];
