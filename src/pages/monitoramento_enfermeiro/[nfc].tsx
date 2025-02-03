import { CardProfile } from "@/components/compounds/CardProfile";
import { DateTimePicker } from "@/components/compounds/DateTimePicker";
import { Drawer } from "@/components/compounds/Drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, Filter, Router } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { NourseType, columns } from "./columns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import NurseRoleSelect from "@/components/compounds/NurseRoleSelect";
import { DataTable } from "./data-table";
import { useRouter } from "next/router";
import { CallsType } from "../monitoramento_chamadas/columns";

const createNourseFormSchema = z.object({
  name: z.string().regex(/^[A-Za-z]+$/i, "Somente letras"),
  date: z.string(),
  time: z.string(),
  role: z.string(),
  nfc: z.string(),
});

type createNourseFormData = z.infer<typeof createNourseFormSchema>;
export default function NourseDetails() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [calls, setCalls] = useState<CallsType[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<createNourseFormData>({
    resolver: zodResolver(createNourseFormSchema),
  });

  const onSubmit = (data: createNourseFormData) => {
    setIsLoading(true);
    console.log(data);
    setIsLoading(false);
    setOpen(true);
  };

  useEffect(() => {
    if (date) {
      setValue("date", date.toISOString().split("T")[0]);
    } else {
      setValue("date", "");
    }
  }, [date]);

  useEffect(() => {
    if (time) {
      setValue("time", time);
    } else {
      setValue("time", "");
    }
  }, [time]);

  const callsMock: NourseType[] = [
    {
      nfc: "NFC-001",
      professional: "João Silva",
      role: "Enfermeiro",
      services: "25",
    },
    {
      nfc: "NFC-002",
      professional: "Maria Souza",
      role: "Técnica de Enfermagem",
      services: "18",
    },
    {
      nfc: "NFC-003",
      professional: "Carlos Oliveira",
      role: "Enfermeiro",
      services: "30",
    },
    {
      nfc: "NFC-004",
      professional: "Ana Mendes",
      role: "Técnica de Enfermagem",
      services: "22",
    },
    {
      nfc: "NFC-005",
      professional: "Rafael Lima",
      role: "Enfermeiro",
      services: "27",
    },
    {
      nfc: "NFC-006",
      professional: "Gabriel Costa",
      role: "Técnico de Enfermagem",
      services: "15",
    },
    {
      nfc: "NFC-007",
      professional: "Beatriz Martins",
      role: "Enfermeira",
      services: "32",
    },
    {
      nfc: "NFC-008",
      professional: "Eduardo Rocha",
      role: "Técnico de Enfermagem",
      services: "19",
    },
    {
      nfc: "NFC-009",
      professional: "Larissa Ferreira",
      role: "Enfermeira",
      services: "24",
    },
    {
      nfc: "NFC-010",
      professional: "Thiago Nunes",
      role: "Técnico de Enfermagem",
      services: "20",
    },
  ];

  return (
    <ScrollArea className="flex-1 h-[100vh]">
      <Button
        onClick={() => {
          router.back();
        }}
        variant={"ghost"}
        className="absolute top-5 left-5 z-10"
      >
        <ChevronLeft /> Voltar
      </Button>
      <div className="min-h-[100vh] flex-col relative justify-center items-center bg-primary pt-20 ">
        <div className="flex flex-col w-full px-28 mt-5 h-full border-b-2 border-foreground">
          <div className="flex justify-around bg-muted p-6 w-full">
            <div className="flex flex-col justify-center items-center gap-2 w-1/3">
              <span className="font-semibold">Profissional</span>
              <span>Guilherme Rodrigo Araújo Antero</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 w-1/3">
              <span className="font-semibold">Cargo</span>
              <span>Enfermeiro Chefe</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 w-1/3">
              <span className="font-semibold">NFC</span>
              <span>NFC-X</span>
            </div>
          </div>
          <div>
            <span className="font-bold">
              {callsMock.length} atendimento{callsMock.length > 1 ? "s" : ""}
            </span>
          </div>
          <div className="py-5">
            <DataTable columns={columns} data={callsMock} />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
