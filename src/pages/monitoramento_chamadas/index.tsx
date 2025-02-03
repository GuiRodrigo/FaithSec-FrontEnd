import { CardProfile } from "@/components/compounds/CardProfile";
import { DateTimePicker } from "@/components/compounds/DateTimePicker";
import { Drawer } from "@/components/compounds/Drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CallsType, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const createNourseFormSchema = z.object({
  name: z.string().regex(/^[A-Za-z]+$/i, "Somente letras"),
  date: z.string(),
  time: z.string(),
  criticality: z.string(),
  id_call: z.string(),
});

type createNourseFormData = z.infer<typeof createNourseFormSchema>;

export default function CalledMonitoring() {
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

  const callsMock: CallsType[] = [
    {
      id_calls: "CALL-001",
      call_start: "1706787600",
      call_end: "1706788200",
      criticality: "emergencia",
      responsible: "João Silva",
      patient: "Carlos Oliveira",
      bed: "B-101",
      room: "101",
    },
    {
      id_calls: "CALL-002",
      call_start: "1706791200",
      call_end: "1706791800",
      criticality: "auxilio",
      responsible: "Maria Souza",
      patient: "Ana Mendes",
      bed: "B-102",
      room: "102",
    },
    {
      id_calls: "CALL-003",
      call_start: "1706794800",
      call_end: undefined,
      criticality: "emergencia",
      responsible: "Carlos Oliveira",
      patient: "Rafael Lima",
      bed: "B-103",
      room: "103",
    },
    {
      id_calls: "CALL-004",
      call_start: "1706798400",
      call_end: "1706799000",
      criticality: "auxilio",
      responsible: "Ana Mendes",
      patient: "Gabriel Costa",
      bed: "B-104",
      room: "104",
    },
    {
      id_calls: "CALL-005",
      call_start: "1706802000",
      call_end: "1706802600",
      criticality: "emergencia",
      responsible: "Rafael Lima",
      patient: "Beatriz Martins",
      bed: "B-105",
      room: "105",
    },
    {
      id_calls: "CALL-006",
      call_start: "1706805600",
      call_end: undefined,
      criticality: "auxilio",
      responsible: "Gabriel Costa",
      patient: "Eduardo Rocha",
      bed: "B-106",
      room: "106",
    },
    {
      id_calls: "CALL-007",
      call_start: "1706809200",
      call_end: "1706809800",
      criticality: "emergencia",
      responsible: "Beatriz Martins",
      patient: "Larissa Ferreira",
      bed: "B-107",
      room: "107",
    },
    {
      id_calls: "CALL-008",
      call_start: "1706812800",
      call_end: "1706813400",
      criticality: "auxilio",
      responsible: "Eduardo Rocha",
      patient: "Thiago Nunes",
      bed: "B-108",
      room: "108",
    },
    {
      id_calls: "CALL-009",
      call_start: "1706816400",
      call_end: undefined,
      criticality: "emergencia",
      responsible: "Larissa Ferreira",
      patient: "João Silva",
      bed: "B-109",
      room: "109",
    },
    {
      id_calls: "CALL-010",
      call_start: "1706820000",
      call_end: "1706820600",
      criticality: "auxilio",
      responsible: "Thiago Nunes",
      patient: "Maria Souza",
      bed: "B-110",
      room: "110",
    },
  ];

  useEffect(() => {
    const sortedCalls = callsMock.sort((a, b) => {
      // Chamadas sem término (call_end undefined ou null) vêm primeiro
      if (!a.call_end && b.call_end) return -1;
      if (a.call_end && !b.call_end) return 1;

      // Depois, ordenar por criticality (emergências primeiro)
      if (a.criticality === "emergencia" && b.criticality === "auxilio")
        return -1;
      if (a.criticality === "auxilio" && b.criticality === "emergencia")
        return 1;

      // Por fim, ordenar por call_start (do menor para o maior)
      return Number(a.call_start) - Number(b.call_start);
    });

    const callsFormatted = sortedCalls.map((call) => ({
      ...call,
      call_start: format(
        new Date(Number(call.call_start) * 1000),
        "dd-MM-yyyy 'às' HH:mm"
      ),
      call_end: call.call_end
        ? format(
            new Date(Number(call.call_end) * 1000),
            "dd-MM-yyyy 'às' HH:mm"
          )
        : "",
    }));

    setCalls(callsFormatted);
  }, []);

  // Função para contar chamadas de emergência
  const countEmergencies = (): number => {
    return calls.filter((call) => call.criticality === "emergencia").length;
  };

  // Função para contar chamadas de auxílio
  const countAuxilio = (): number => {
    return calls.filter((call) => call.criticality === "auxilio").length;
  };

  return (
    <div className="w-[100vw] max-w-[100vw] h-[100v] flex relative">
      <Drawer />
      <ScrollArea className="flex-1 h-[100vh]">
        <div className="w-full min-h-[100vh] flex flex-col relative justify-center items-center bg-primary pt-20 ">
          <div className="flex flex-col w-full px-28 mt-5 h-full">
            <form className="flex flex-col bg-muted p-6 w-full">
              <div className="w-full border-b-2 border-tertiary items-center flex justify-end">
                <Button variant={"link"}>Buscar</Button>
                <Filter />
              </div>
              <div className="flex justify-around flex-1">
                <div className="flex flex-col gap-2 w-1/3 ">
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
                  <div>
                    <Label htmlFor="name">Responsável</Label>
                    <Input {...register("name")} id="name" type="text" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-1/3">
                  <div>
                    <Label htmlFor="criticality">Criticidade</Label>
                    <Select
                      value={getValues("criticality")}
                      onValueChange={(v) => setValue("criticality", v)}
                      form="criticality"
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auxilio">Auxílio</SelectItem>
                        <SelectItem value="emergencia">Emergência</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.date && (
                      <span className="text-destructive font-semibold">
                        {errors.date.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="id_call">ID da chamada</Label>
                    <Input {...register("id_call")} id="id_call" type="text" />
                  </div>
                </div>
              </div>
            </form>
            <div className="w-full flex justify-around mt-5">
              <span className="font-bold">
                QUANTIDADE DE CHAMADA DE EMERGÊNCIA: {countEmergencies()}
              </span>
              <span className="font-bold">
                QUANTIDADE DE CHAMADA DE AUXÍLIO: {countAuxilio()}
              </span>
            </div>
            <div className="py-5">
              <DataTable columns={columns} data={calls} />
            </div>
          </div>
        </div>
        <CardProfile />
      </ScrollArea>
    </div>
  );
}
