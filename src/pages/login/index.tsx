import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { clientStorageKey, useAuth } from "@/hooks/auth";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import api from "@/service/api";

const createUserFormSchema = z.object({
  cpf: z
    .string()
    .nonempty("CPF é obrigatório.")
    .regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, "CPF inválido"),
  password: z.string().nonempty("Senha é obrigatória."),
});

type createUserFormData = z.infer<typeof createUserFormSchema>;

export default function Login() {
  const { setUserData } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<createUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  const onSubmit = (data: createUserFormData) => {
    setIsLoading(true);
    api
      .post("/login-admin", {
        cpf: data.cpf,
        senha: data.password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          setUserData(res.data.usuario);
          const userInfoJson = JSON.stringify(res.data.usuario);
          localStorage.setItem(clientStorageKey, userInfoJson);
          router.push("/home");
        } else {
          setError("cpf", { message: "CPF ou senha inválidos." });
          setError("password", { message: "CPF ou senha inválidos." });
        }
      })
      .catch((err) => {
        setError("cpf", { message: "CPF ou senha inválidos." });
        setError("password", { message: "CPF ou senha inválidos." });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col w-[100vw] h-[100vh] flex-1 items-center justify-center">
      <img
        src="logo_faithsec_nome.png"
        className="w-28 absolute top-5 left-5"
        alt="logo faithsec"
      />
      <div className=" grid gap-6 border-black border-4 p-12">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">LOGIN</h1>
          <p className="text-balance text-muted-foreground">
            Insira o usuário e senha fornecidos pela empresa.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="cpf">CPF</Label>

              <InputMask
                {...register("cpf")}
                id="cpf"
                mask="999.999.999-99"
                placeholder="000.000.000-00"
                required
                className="border border-gray-300 rounded px-3 py-1.5"
              />
              {errors.cpf && <span>{errors.cpf.message}</span>}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
              </div>
              <Input
                {...register("password")}
                id="password"
                type="password"
                required
              />
              {errors.password && <span>{errors.password.message}</span>}
            </div>
            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading ? <LoaderCircle className="animate-spin" /> : " Login"}
            </Button>
          </div>
        </form>
      </div>
      <div className="w-[100vw] h-[12px] bg-primary absolute bottom-0"></div>
    </div>
  );
}
