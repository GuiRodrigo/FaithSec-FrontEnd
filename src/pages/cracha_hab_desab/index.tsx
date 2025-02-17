import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/service/api";
import { Drawer } from "@/components/compounds/Drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import NurseRoleSelect from "@/components/compounds/NurseRoleSelect";
import { DateTimePicker } from "@/components/compounds/DateTimePicker";
import { CardProfile } from "@/components/compounds/CardProfile";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { columns, NourseType } from "./columns";
import { DataTable } from "./data-table";
import { useAuth } from "@/hooks/auth";

const createNourseFormSchema = z.object({
  nome: z.string().optional(),
  estadoCracha: z.string().optional(),
  cargo: z.string().optional(),
  nfc: z.string().optional(),
});

type createNourseFormData = z.infer<typeof createNourseFormSchema>;

export default function NourseBadge() {
  const { alterTable, setAlterTable } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
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

  const onSubmit = async (data: createNourseFormData) => {
    // Verifica se pelo menos um campo foi preenchido
    const hasAnyValue = Object.values(data).some(
      (value) => value !== undefined && value !== null && value !== ""
    );

    if (!hasAnyValue) {
      alert("Preencha pelo menos um campo para realizar a busca");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post("/enfermeiros/buscar", data);
      setNourses(response.data);
    } catch (error: any) {
      console.error("Erro ao buscar enfermeiros:", error);
      alert(
        error.response?.data?.details ||
          error.response?.data?.error ||
          "Erro ao buscar enfermeiros. Tente novamente."
      );
      setNourses([]); // Limpa a lista em caso de erro
    } finally {
      setIsLoading(false);
      setOpen(true);
    }
  };

  const onClear = () => {
    setValue("nome", "");
    setValue("estadoCracha", "");
    setValue("cargo", "");
    setValue("nfc", "");
    fechNourses();
  };

  const fechNourses = () => {
    api
      .get("/enfermeiros")
      .then((res) => {
        console.log(res);
        setNourses(res.data);
      })
      .catch((err) => {
        console.log(err);
        setNourses([]);
      });
  };

  useEffect(() => {
    fechNourses();
  }, [alterTable]);

  return (
    <div className="w-[100vw] max-w-[100vw] h-[100v] flex relative">
      <Drawer />
      <ScrollArea className="flex-1 h-[100vh]">
        <div className="min-h-[100vh] flex-col relative justify-center items-center bg-primary pt-20 ">
          <div className="flex flex-col w-full px-28 mt-5 h-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col bg-muted p-6 w-full"
            >
              <div className="w-full border-b-2 border-tertiary items-center flex justify-end">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    onClear();
                  }}
                  variant={"link"}
                  className="text-destructive"
                  disabled={isLoading}
                >
                  Limpar
                </Button>
                <Button type="submit" variant={"link"} disabled={isLoading}>
                  Buscar
                </Button>
                <Filter />
              </div>
              <div className="flex justify-around flex-1">
                <div className="flex flex-col gap-2 w-1/3">
                  <div>
                    <Label htmlFor="nome">Profissional</Label>
                    <Input {...register("nome")} id="nome" type="text" />
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
                      onChange={(value) => setValue("cargo", value)}
                      value={getValues("cargo")}
                    />
                    {errors.cargo && (
                      <span className="text-destructive font-semibold">
                        {errors.cargo.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="date">Estado</Label>
                    <Select
                      onValueChange={(v) => {
                        setValue("estadoCracha", v);
                      }}
                      value={getValues("estadoCracha")}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione um estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem key={"1"} value={"habilitado"}>
                          Habilitado
                        </SelectItem>

                        <SelectItem key={"2"} value={"desabilitado"}>
                          Desabilitado
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.estadoCracha && (
                      <span className="text-destructive font-semibold">
                        {errors.estadoCracha.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </form>
            <div className="py-5">
              <DataTable columns={columns} data={nourses} />
            </div>
          </div>
        </div>
        <CardProfile />
      </ScrollArea>
    </div>
  );
}
