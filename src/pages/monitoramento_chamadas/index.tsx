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
      call_start: "1706784000",
      call_end: "1706787600",
      criticality: "auxilio",
      responsible: "Enfermeiro João",
      patient: "Carlos Silva",
    },
    {
      id_calls: "CALL-002",
      call_start: "1706787600",
      call_end: "1706791200",
      criticality: "emergencia",
      responsible: "Enfermeira Maria",
      patient: "Ana Souza",
    },
    {
      id_calls: "CALL-003",
      call_start: "1706791200",
      call_end: "1706794800",
      criticality: "auxilio",
      responsible: "Enfermeiro Carlos",
      patient: "Pedro Oliveira",
    },
    {
      id_calls: "CALL-004",
      call_start: "1706794800",
      call_end: "1706798400",
      criticality: "emergencia",
      responsible: "Enfermeira Ana",
      patient: "Juliana Mendes",
    },
    {
      id_calls: "CALL-005",
      call_start: "1706798400",
      call_end: "1706802000",
      criticality: "auxilio",
      responsible: "Enfermeiro Rafael",
      patient: "Marcos Lima",
    },
    {
      id_calls: "CALL-006",
      call_start: "1706802000",
      call_end: "1706805600",
      criticality: "emergencia",
      responsible: "Enfermeiro Gabriel",
      patient: "Fernanda Costa",
    },
    {
      id_calls: "CALL-007",
      call_start: "1706805600",
      call_end: "1706809200",
      criticality: "auxilio",
      responsible: "Enfermeira Beatriz",
      patient: "Ricardo Martins",
    },
    {
      id_calls: "CALL-008",
      call_start: "1706809200",
      criticality: "emergencia",
      responsible: "Enfermeiro Eduardo",
      patient: "Tatiane Rocha",
    },
    {
      id_calls: "CALL-009",
      call_start: "1706812800",
      criticality: "auxilio",
      responsible: "Enfermeira Larissa",
      patient: "Roberto Ferreira",
    },
    {
      id_calls: "CALL-010",
      call_start: "1706816400",
      criticality: "emergencia",
      responsible: "Enfermeiro Thiago",
      patient: "Isabela Nunes",
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
