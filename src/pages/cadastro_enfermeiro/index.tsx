import { CardProfile } from "@/components/compounds/CardProfile";
import { Drawer } from "@/components/compounds/Drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputMask from "react-input-mask";
import { Button } from "@/components/ui/button";
import NurseRoleSelect from "@/components/compounds/NurseRoleSelect";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const createNourseFormSchema = z.object({
  name: z
    .string()
    .nonempty("Nome é obrigatório.")
    .regex(/^[A-Za-z]+$/i, "Somente letras"),
  date: z.string().nonempty("Data é obrigatória."),
  phone: z
    .string()
    .min(15, "Telefone inválido") // Garante que todos os dígitos foram preenchidos
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Formato inválido"),
  email: z.string().nonempty("Email é obrigatória."),
  role: z
    .string({ required_error: "Selecione um cargo!" })
    .nonempty("Cargo é obrigatória."),
  cpf: z
    .string()
    .nonempty("CPF é obrigatório.")
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Formato de CPF inválido."),
  coren: z.string().nonempty("Coren é obrigatório."),
  nfc: z.string().nonempty("Coren é obrigatório."),
  address: z.string().nonempty("Coren é obrigatório."),
  password: z.string().nonempty("Coren é obrigatório."),
});

type createNourseFormData = z.infer<typeof createNourseFormSchema>;

export default function NourseMonitoring() {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

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
    console.log(getValues("role"));
  }, [getValues("role")]);

  return (
    <div className="w-[100vw] h-[100v] flex relative">
      <Drawer />
      <Dialog open={open}>
        <DialogContent
          className="w-[20vw] h-[15vw] bg-primary border-foreground"
          onClick={() => {
            setOpen(false);
          }}
        >
          <DialogHeader className="flex flex-col justify-center items-center relative p-5">
            <div className="opacity-20 absolute h-full rounded-2xl w-full bg-primary-foreground"></div>
            <div className="flex flex-col justify-center items-center relative p-5">
              <DialogTitle className="text-center">
                Cadastro enviado com sucesso!
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
              CADASTRO ENFERMEIRO(A)
            </span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="flex px-5 py-3 flex-1">
              <div className="flex flex-col  px-20 gap-5 w-1/2 min-h-full">
                <div className="flex flex-col gap-1">
                  <Label className="font-bold cursor-pointer" htmlFor="name">
                    Nome Completo
                  </Label>
                  <Input {...register("name")} id="name" type="text" required />
                  {errors.name && (
                    <span className="text-destructive font-semibold">
                      {errors.name.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="font-bold cursor-pointer" htmlFor="date">
                    Data Nascimento
                  </Label>
                  <Input {...register("date")} id="date" type="date" required />
                  {errors.date && (
                    <span className="text-destructive font-semibold">
                      {errors.date.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <Label className="font-bold cursor-pointer" htmlFor="phone">
                    Telefone
                  </Label>
                  <InputMask
                    mask="(99) 99999-9999"
                    placeholder="(00) 00000-0000"
                    {...register("phone")}
                  >
                    {(inputProps) => (
                      <Input {...inputProps} id="phone" type="text" required />
                    )}
                  </InputMask>
                  {errors.phone && (
                    <span className="text-destructive font-semibold">
                      {errors.phone.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="font-bold cursor-pointer" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    {...register("email")}
                    id="email"
                    type="email"
                    required
                  />
                  {errors.email && (
                    <span className="text-destructive font-semibold">
                      {errors.email.message}
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
                  <Label className="font-bold cursor-pointer" htmlFor="coren">
                    Coren
                  </Label>
                  <Input
                    {...register("coren")}
                    id="coren"
                    type="coren"
                    required
                  />
                  {errors.coren && (
                    <span className="text-destructive font-semibold">
                      {errors.coren.message}
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
      <CardProfile />
    </div>
  );
}
