import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { clientStorageKey, useAuth } from "@/hooks/auth";
import api from "@/service/api";

const createUserFormSchema = z.object({
  cpf: z
    .string()
    .nonempty("CPF é obrigatório.")
    .regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, "CPF inválido"),
  password: z.string().nonempty("Senha é obrigatória."),
});

type createUserFormData = z.infer<typeof createUserFormSchema>;

export default function TwoStepVerification() {
  const { setNourseLogin } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<createUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  const onSubmit = (data: createUserFormData) => {
    setIsLoading(true);
    api
      .post("/login-enfermeiro", {
        cpf: data.cpf,
        senha: data.password,
      })
      .then((res) => {
        if (res.data.success) {
          router.push("/celular/login/nfc");
          setNourseLogin(data);
        } else {
          setError("cpf", { message: "CPF ou senha inválidos" });
          setError("password", { message: "CPF ou senha inválidos" });
          // alert("CPF ou senha inválidos");
        }
      })
      .catch((err) => {
        alert(err);
        setError("cpf", { message: "CPF ou senha inválidos" });
        setError("password", { message: "CPF ou senha inválidos" });
        // alert("Usuário ou senha inválidos");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center p-4 bg-[#367ec2]">
      <h1 className="text-2xl font-bold mb-2 text-white">
        Verificação de Duas Etapas
      </h1>
      <p className="mb-4 text-white">LOGIN</p>
      <div className="w-full max-w-sm border-4 border-black p-6 bg-[#367ec2] rounded-md shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="cpf" className="text-white">
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
              <span className="text-red-500">{errors.cpf.message}</span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password" className="text-white">
              Senha
            </Label>
            <Input
              {...register("password")}
              id="password"
              type="password"
              required
              className="bg-white"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              className="w-full bg-gray-400"
              onClick={() => {}}
            >
              Cancelar
            </Button>
            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading ? <LoaderCircle className="animate-spin" /> : "Entrar"}
            </Button>
          </div>
        </form>
      </div>
      <p className="mt-4 text-white">1ª Etapa</p>
      <img
        src="/logo_faithsec_nome.png"
        className="w-16 mt-2"
        alt="Logo FaithSec"
      />
    </div>
  );
}
