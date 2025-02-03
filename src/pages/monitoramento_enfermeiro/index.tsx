import { CardProfile } from "@/components/compounds/CardProfile";
import { DateTimePicker } from "@/components/compounds/DateTimePicker";
import { Drawer } from "@/components/compounds/Drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { NourseType, columns } from "./columns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import NurseRoleSelect from "@/components/compounds/NurseRoleSelect";
import { DataTable } from "./data-table";

const createNourseFormSchema = z.object({
  name: z.string().regex(/^[A-Za-z]+$/i, "Somente letras"),
  date: z.string(),
  time: z.string(),
  role: z.string(),
  nfc: z.string(),
});

type createNourseFormData = z.infer<typeof createNourseFormSchema>;

export default function NourseMonitoring() {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [nourses, setNourses] = useState<NourseType[]>([]);

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

  const nursesMock: NourseType[] = [
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
    <div className="w-[100vw] max-w-[100vw] h-[100v] flex relative">
      <Drawer />
      <ScrollArea className="flex-1 h-[100vh]">
        <div className="min-h-[100vh] flex-col relative justify-center items-center bg-primary pt-20 ">
          <div className="flex flex-col w-full px-28 mt-5 h-full">
            <form className="flex flex-col bg-muted p-6 w-full">
              <div className="w-full border-b-2 border-tertiary items-center flex justify-end">
                <Button type="submit" variant={"link"}>
                  Buscar
                </Button>
                <Filter />
              </div>
              <div className="flex justify-around flex-1">
                <div className="flex flex-col gap-2 w-1/3">
                  <div>
                    <Label htmlFor="name">Profissional</Label>
                    <Input {...register("name")} id="name" type="text" />
                  </div>
                  <div>
                    <Label htmlFor="nfc">NFC</Label>
                    <Input {...register("nfc")} id="nfc" type="text" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-1/3 ">
                  <div>
                    <Label htmlFor="criticality">Cargo</Label>
                    <NurseRoleSelect
                      onChange={(value) => setValue("role", value)}
                      value={getValues("role")}
                    />
                    {errors.date && (
                      <span className="text-destructive font-semibold">
                        {errors.date.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="date">Data e Hora</Label>
                    <DateTimePicker
                      date={date}
                      time={time}
                      onSelectDate={setDate}
                      onSelectTime={setTime}
                    />
                    {errors.date && (
                      <span className="text-destructive font-semibold">
                        {errors.date.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </form>
            <div className="py-5">
              <DataTable columns={columns} data={nursesMock} />
            </div>
          </div>
        </div>
        <CardProfile />
      </ScrollArea>
    </div>
  );
}
