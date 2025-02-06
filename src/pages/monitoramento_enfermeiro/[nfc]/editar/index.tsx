import { DatePicker } from "@/components/compounds/DatePicker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputMask from "react-input-mask";

import api from "@/service/api";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import NurseRoleSelect from "@/components/compounds/NurseRoleSelect";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/router";
import { NourseType } from "../../columns";
import NurseAlaSelect from "@/components/compounds/NurseAlaSelect";

const createNourseFormSchema = z.object({
  nome: z
    .string()
    .nonempty("Nome é obrigatório.")
    .regex(/^(?!\s*$)[A-Za-z\s]+$/i, "Somente letras"),
  dataNasc: z.string().nonempty("Data é obrigatória."),
  telefone1: z
    .string()
    .min(15, "Telefone inválido") // Garante que todos os dígitos foram preenchidos
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Formato inválido")
    .nonempty("Telefone é obrigatória."),
  ala: z.string().nonempty("Ala é obrigatória."),
  role: z
    .string({ required_error: "Selecione um cargo!" })
    .nonempty("Cargo é obrigatória."),
  cpf: z
    .string()
    .nonempty("CPF é obrigatório.")
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Formato de CPF inválido."),
  phoneSecondary: z
    .string()
    .min(15, "Telefone inválido") // Garante que todos os dígitos foram preenchidos
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Formato inválido")
    .nonempty("Telefone de emergência é obrigatória."),
  nfc: z.string().nonempty("Identificador único é obrigatório."),
  address: z.string().nonempty("Endereço é obrigatório."),
  password: z.string().nonempty("Senha é obrigatória."),
});

type createNourseFormData = z.infer<typeof createNourseFormSchema>;

export default function Edit() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [nourse, setNourse] = useState<NourseType | undefined>(undefined);

  const { nfc } = router.query;

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

  useEffect(() => {
    console.log(nfc);
    if (nfc) {
      api
        .post(`/enfermeiros/buscar`, { nfc })
        .then((res) => {
          console.log(res);
          setNourse(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [nfc]);

  useEffect(() => {
    if (nourse) {
      setValue("address", nourse?.endereco);
      setValue("nome", nourse?.nome);
      setValue("cpf", nourse?.cpf);
      setValue("nfc", nourse?.nfc);
      setValue("telefone1", nourse?.telefone1);
      setValue("role", nourse?.cargo);
      setValue("phoneSecondary", nourse?.telefone2);
      setValue("password", nourse?.senha);
      setValue("dataNasc", nourse?.dataNasc);
      setValue("ala", nourse?.ala);
    }
  }, [nourse]);

  const onSubmit = (data: createNourseFormData) => {
    setIsLoading(true);
    api
      .post("/enfermeiro/atualizar", {
        nfc: data.nfc,
        telefone1: data.telefone1,
        telefone2: data.phoneSecondary,
        nome: data.nome,
        senha: data.password,
        dataNasc: data.dataNasc,
        cargo: data.role,
        cpf: data.cpf,
        endereco: data.address,
        ala: data.ala,
      })
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (date) {
      setValue("dataNasc", date.toISOString().split("T")[0]);
    } else {
      setValue("dataNasc", "");
    }
  }, [date]);

  return (
    <div className="w-[100vw] h-[100v] flex relative">
      <Button
        onClick={() => {
          router.back();
        }}
        variant={"ghost"}
        className="absolute top-5 left-5 z-10"
      >
        <ChevronLeft /> Voltar
      </Button>
      <Dialog open={open}>
        <DialogContent
          className="w-[20vw] h-[15vw] bg-primary border-foreground"
          onClick={() => {
            setOpen(false);
            router.back();
          }}
        >
          <DialogHeader className="flex flex-col justify-center items-center relative p-5">
            <div className="opacity-20 absolute h-full rounded-2xl w-full bg-primary-foreground"></div>
            <div className="flex flex-col justify-center items-center relative p-5">
              <DialogTitle className="text-center">
                Cadastro atualizado com sucesso!
              </DialogTitle>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="w-full flex flex-col relative justify-center items-center bg-primary pt-20 h-[100vh]">
        <div className=" absolute opacity-45 bg-primary-foreground w-[65vw] h-[75vh] "></div>
        <div className="border-2 border-foreground flex w-[65vw] h-[75vh] flex-col pt-2 z-10">
          <div className="flex justify-center items-center w-full">
            <span className="bg-primary-foreground px-14 py-3 font-bold">
              EDITAR CADASTRO DO ENFERMEIRO(A)
            </span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="flex px-5 py-3 flex-1">
              <div className="flex flex-col  px-20 gap-5 w-1/2 min-h-full">
                <div className="flex flex-col gap-1">
                  <Label className="font-bold cursor-pointer" htmlFor="nome">
                    Nome Completo
                  </Label>
                  <Input {...register("nome")} id="nome" type="text" required />
                  {errors.nome && (
                    <span className="text-destructive font-semibold">
                      {errors.nome.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <Label
                    className="font-bold cursor-pointer"
                    htmlFor="dataNasc"
                  >
                    Data Nascimento
                  </Label>
                  <Input
                    {...register("dataNasc")}
                    id="dataNasc"
                    type="date"
                    required
                  />
                  {errors.dataNasc && (
                    <span className="text-destructive font-semibold">
                      {errors.dataNasc.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <Label
                    className="font-bold cursor-pointer"
                    htmlFor="telefone1"
                  >
                    Telefone
                  </Label>
                  <InputMask
                    mask="(99) 99999-9999"
                    placeholder="(00) 00000-0000"
                    {...register("telefone1")}
                  >
                    {(inputProps) => (
                      <Input
                        {...inputProps}
                        id="telefone1"
                        type="text"
                        required
                      />
                    )}
                  </InputMask>
                  {errors.telefone1 && (
                    <span className="text-destructive font-semibold">
                      {errors.telefone1.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="font-bold cursor-pointer" htmlFor="email">
                    Ala
                  </Label>
                  <NurseAlaSelect
                    onChange={(value) => setValue("ala", value)}
                    value={watch("ala")}
                  />
                  {errors.ala && (
                    <span className="text-destructive font-semibold">
                      {errors.ala.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="font-bold cursor-pointer" htmlFor="role">
                    Cargo
                  </Label>
                  <NurseRoleSelect
                    onChange={(value) => setValue("role", value)}
                    value={watch("role")}
                  />
                  {errors.role && (
                    <span className="text-destructive font-semibold">
                      {errors.role.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col px-20 w-1/2  gap-5  min-h-full">
                <div className="flex flex-col gap-1">
                  <Label className="font-bold cursor-pointer" htmlFor="cpf">
                    CPF
                  </Label>
                  <InputMask
                    {...register("cpf")}
                    id="cpf"
                    mask="999.999.999-99"
                    placeholder="000.000.000-00"
                    required
                    className="border border-gray-300 rounded px-3 py-1.5"
                  />
                  {errors.cpf && (
                    <span className="text-destructive font-semibold">
                      {errors.cpf.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <Label className="font-bold cursor-pointer" htmlFor="nfc">
                    NFC (identificador único)
                  </Label>
                  <Input {...register("nfc")} id="nfc" type="nfc" required />
                  {errors.nfc && (
                    <span className="text-destructive font-semibold">
                      {errors.nfc.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <Label className="font-bold cursor-pointer" htmlFor="coren">
                    Telefone de emergência
                  </Label>
                  <InputMask
                    mask="(99) 99999-9999"
                    placeholder="(00) 00000-0000"
                    {...register("phoneSecondary")}
                  >
                    {(inputProps) => (
                      <Input
                        {...inputProps}
                        id="phoneSecondary"
                        type="text"
                        required
                      />
                    )}
                  </InputMask>
                  {errors.phoneSecondary && (
                    <span className="text-destructive font-semibold">
                      {errors.phoneSecondary.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <Label className="font-bold cursor-pointer" htmlFor="address">
                    Endereço
                  </Label>
                  <Input
                    {...register("address")}
                    id="address"
                    type="text"
                    required
                  />
                  {errors.address && (
                    <span className="text-destructive font-semibold">
                      {errors.address.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <Label
                    className="font-bold cursor-pointer"
                    htmlFor="password"
                  >
                    Senha de acesso
                  </Label>
                  <Input
                    {...register("password")}
                    id="password"
                    type="text"
                    required
                  />
                  {errors.password && (
                    <span className="text-destructive font-semibold">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center w-full">
              <Button type="submit">ENVIAR CADASTRO</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
