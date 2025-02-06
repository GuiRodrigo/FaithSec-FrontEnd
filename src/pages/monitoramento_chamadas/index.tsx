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
import api from "@/service/api";

const createNourseFormSchema = z.object({
  responsavel: z.string().optional(),
  data: z.string().optional(),
  time: z.string().optional(),
  criticidade: z.string().optional(),
  idChamada: z.string().optional(),
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

  const onSubmit = async (data: createNourseFormData) => {
    // Verifica se pelo menos um campo foi preenchido
    const hasAnyValue = Object.values(data).some(
      (value) => value !== undefined && value !== null && value !== ""
    );

    if (!hasAnyValue) {
      // Você pode usar aqui o componente de toast da sua aplicação se tiver um
      alert("Preencha pelo menos um campo para realizar a busca");
      return;
    }

    setIsLoading(true);
    console.log(data);
    try {
      const response = await api.post("/chamadas", data);

      const sortedCalls = response.data.sort((a: CallsType, b: CallsType) => {
        // Chamadas sem término (call_end undefined ou null) vêm primeiro
        if (!a.termino && b.termino) return -1;
        if (a.termino && !b.termino) return 1;

        // Depois, ordenar por criticidade (emergências primeiro)
        if (a.criticidade === "Emergencia" && b.criticidade === "Auxilio")
          return -1;
        if (a.criticidade === "Auxilio" && b.criticidade === "Emergencia")
          return 1;

        // Por fim, ordenar por call_start (do menor para o maior)
        return Number(a.inicio) - Number(b.inicio);
      });

      setCalls(sortedCalls);
    } catch (error) {
      console.error("Erro ao buscar chamadas:", error);
      // Você pode usar aqui o componente de toast da sua aplicação se tiver um
      alert("Erro ao buscar chamadas. Tente novamente.");
    } finally {
      setIsLoading(false);
      setOpen(true);
    }
  };

  useEffect(() => {
    if (date) {
      setValue("data", date.toISOString().split("T")[0]);
    } else {
      setValue("data", "");
    }
  }, [date]);

  useEffect(() => {
    if (time) {
      setValue("time", time);
    } else {
      setValue("time", "");
    }
  }, [time]);

  useEffect(() => {}, []);

  useEffect(() => {
    api
      .post("/chamadas")
      .then((res) => {
        console.log(res.data);
        const initCalss: CallsType[] = res.data;
        const sortedCalls = initCalss.sort((a, b) => {
          // Chamadas sem término (call_end undefined ou null) vêm primeiro
          if (!a.termino && b.termino) return -1;
          if (a.termino && !b.termino) return 1;

          // Depois, ordenar por criticidade (emergências primeiro)
          if (a.criticidade === "Emergencia" && b.criticidade === "Auxilio")
            return -1;
          if (a.criticidade === "Auxilio" && b.criticidade === "Emergencia")
            return 1;

          // Por fim, ordenar por call_start (do menor para o maior)
          return Number(a.inicio) - Number(b.inicio);
        });

        // const callsFormatted = sortedCalls.map((call) => ({
        //   ...call,
        //   call_start: format(
        //     new Date(Number(call.inicio) * 1000),
        //     "dd-MM-yyyy 'às' HH:mm"
        //   ),
        //   call_end: call.termino
        //     ? format(
        //         new Date(Number(call.termino) * 1000),
        //         "dd-MM-yyyy 'às' HH:mm"
        //       )
        //     : "",
        // }));
        console.log("sortedCalls");
        console.log(sortedCalls);

        setCalls(sortedCalls);
      })
      .catch((err) => console.log(err));
  }, []);

  // Função para contar chamadas de emergência
  const countEmergencies = (): number => {
    return calls.filter((call) => call.criticidade === "Emergencia").length;
  };

  // Função para contar chamadas de auxílio
  const countAuxilio = (): number => {
    return calls.filter((call) => call.criticidade === "Auxilio").length;
  };

  return (
    <div className="w-[100vw] max-w-[100vw] h-[100v] flex relative">
      <Drawer />
      <ScrollArea className="flex-1 h-[100vh]">
        <div className="w-full min-h-[100vh] flex flex-col relative justify-center items-center bg-primary pt-20 ">
          <div className="flex flex-col w-full px-28 mt-5 h-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col bg-muted p-6 w-full"
            >
              <div className="w-full border-b-2 border-tertiary items-center flex justify-end">
                <Button type="submit" variant={"link"} disabled={isLoading}>
                  {isLoading ? "Buscando..." : "Buscar"}
                </Button>
                <Filter />
              </div>
              <div className="flex justify-around flex-1">
                <div className="flex flex-col gap-2 w-1/3 ">
                  <div>
                    <Label htmlFor="data">Data e Hora</Label>
                    <DateTimePicker
                      date={date}
                      time={time}
                      onSelectDate={setDate}
                      onSelectTime={setTime}
                    />
                    {errors.data && (
                      <span className="text-destructive font-semibold">
                        {errors.data.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="responsavel">Responsável</Label>
                    <Input
                      {...register("responsavel")}
                      id="responsavel"
                      type="text"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-1/3">
                  <div>
                    <Label htmlFor="criticidade">Criticidade</Label>
                    <Select
                      value={getValues("criticidade")}
                      onValueChange={(v) => setValue("criticidade", v)}
                      form="criticidade"
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Auxilio">Auxílio</SelectItem>
                        <SelectItem value="Emergencia">Emergência</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.criticidade && (
                      <span className="text-destructive font-semibold">
                        {errors.criticidade.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="idChamada">ID da chamada</Label>
                    <Input
                      {...register("idChamada")}
                      id="idChamada"
                      type="text"
                    />
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
