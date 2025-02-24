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
import api from "@/service/api";
import NurseAlaSelect from "@/components/compounds/NurseAlaSelect";
import PaginationComponent from "@/components/compounds/PaginationComponent";

const createNourseFormSchema = z.object({
  nome: z.string().optional(),
  ala: z.string().optional(),
  cargo: z.string().optional(),
  nfc: z.string().optional(),
});

type createNourseFormData = z.infer<typeof createNourseFormSchema>;

export default function NourseMonitoring() {
  const [isLoading, setIsLoading] = useState(false);
  const [limitPagination, setLimitePagination] = useState<number>();
  const [pagination, setPagination] = useState<number>();
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
      fechNourses();
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
    setValue("ala", "");
    setValue("cargo", "");
    setValue("nfc", "");
    fechNourses();
  };

  const fechNourses = () => {
    api
      .post("/enfermeiros/buscar", { ...getValues(), page: pagination })
      .then((res) => {
        console.log(res);
        setNourses(res.data.enfermeiros);
        setLimitePagination(res.data.totalPaginas);
        setPagination(res.data.paginaAtual);
      })
      .catch((err) => {
        console.log(err);
        setNourses([]);

        setLimitePagination(1);
        setPagination(1);
      });
  };

  useEffect(() => {
    fechNourses();
  }, [pagination]);

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
                  {isLoading ? "Buscando..." : "Buscar"}
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
                    <Label htmlFor="ala">Ala</Label>
                    <NurseAlaSelect
                      onChange={(value) => setValue("ala", value)}
                      value={getValues("ala")}
                    />
                    {errors.ala && (
                      <span className="text-destructive font-semibold">
                        {errors.ala.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </form>
            <div className="py-5 gap-4 flex flex-col">
              <DataTable columns={columns} data={nourses} />
              <PaginationComponent
                currentPage={pagination ?? 1}
                totalPages={limitPagination ?? 1}
                onPageChange={(page) => setPagination(page)}
              />
            </div>
          </div>
        </div>
        <CardProfile />
      </ScrollArea>
    </div>
  );
}
