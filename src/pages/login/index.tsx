import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { clientStorageKey, useAuth } from "@/hooks/auth";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

const createUserFormSchema = z.object({
  username: z
    .string()
    .nonempty("Usuário é obrigatório.")
    .regex(/^(?!\s*$)[A-Za-z\s]+$/i, "Somente letras"),
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
    formState: { errors },
  } = useForm<createUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  const onSubmit = (data: createUserFormData) => {
    setIsLoading(true);
    setUserData(data);
    const userInfoJson = JSON.stringify(data);
    localStorage.setItem(clientStorageKey, userInfoJson);
    router.push("/home");
    setIsLoading(false);
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
              <Label htmlFor="username">Usuário</Label>
              <Input
                {...register("username")}
                id="username"
                type="text"
                required
              />
              {errors.username && <span>{errors.username.message}</span>}
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
