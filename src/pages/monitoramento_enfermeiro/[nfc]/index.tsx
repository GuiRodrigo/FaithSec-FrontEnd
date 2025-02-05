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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import NurseRoleSelect from "@/components/compounds/NurseRoleSelect";
import { useRouter } from "next/router";
import { CallsType } from "../../monitoramento_chamadas/columns";
import api from "@/service/api";
import { DataTable } from "./data-table";
import { NourseType } from "../columns";
import { columns } from "./columns";

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
  const { nfc } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [nourse, setNourse] = useState<NourseType | undefined>(undefined);
  const [calls, setCalls] = useState<CallsType[] | undefined>(undefined);

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
    console.log(nfc);
    if (nfc) {
      api
        .post(`/enfermeiro`, { nfc })
        .then((res) => {
          setNourse(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [nfc]);

  useEffect(() => {
    api
      .post(`/chamadas`, { nfc })
      .then((res) => {
        setCalls(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex-1 bg-primary h-[100vh]">
      <Button
        onClick={() => {
          router.back();
        }}
        variant={"ghost"}
        className="absolute top-5 left-5 z-10"
      >
        <ChevronLeft /> Voltar
      </Button>
      <ScrollArea className="max-h-[90vh] flex-col relative justify-center items-center  pt-20 ">
        <div className="flex flex-col w-full px-28 mt-5 h-full">
          <div className="flex justify-around bg-muted p-6 w-full  border-b-2 border-muted-foreground">
            <div className="flex flex-col justify-center items-center gap-2 w-1/3">
              <span className="font-semibold">Profissional</span>
              <span>{nourse ? nourse.nome : ""}</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 w-1/3">
              <span className="font-semibold">Cargo</span>
              <span>{nourse ? nourse.cargo : ""}</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 w-1/3">
              <span className="font-semibold">NFC</span>
              <span>{nourse ? nourse.nfc : ""}</span>
            </div>
          </div>
          <div className="flex justify-end w-full bg-muted px-4 py-2">
            <span className="font-semibold">
              {calls
                ? `${calls.length} atendimento${calls.length > 1 ? "s" : ""}`
                : null}
            </span>
          </div>
          <div className="py-5">
            {calls ? <DataTable columns={columns} data={calls} /> : null}
          </div>
        </div>
      </ScrollArea>
      <div className="flex justify-center items-center">
        <Button
          onClick={() => {
            router.push(`${nfc}/editar`);
          }}
          className="bg-secondary text-foreground font-semibold rounded-xl"
        >
          VER CADASTRO
        </Button>
      </div>
    </div>
  );
}
