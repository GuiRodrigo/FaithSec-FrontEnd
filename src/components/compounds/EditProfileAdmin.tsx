import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/service/api";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/router";

const schema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "A senha atual deve ter pelo menos 6 caracteres"),
    newPassword: z
      .string()
      .min(6, "A nova senha deve ter pelo menos 6 caracteres"),
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "A nova senha não pode ser igual à atual",
    path: ["newPassword"],
  });

export function DialogPassword() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const { userData } = useAuth();
  const router = useRouter();

  const togglePasswordVisibility = (
    field: "currentPassword" | "newPassword"
  ) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit = (data: any) => {
    setIsLoading(true);
    api
      .post("/atualizar-senha", {
        cpf: userData?.cpf,
        senhaNova: data.newPassword,
        senhaAntiga: data.currentPassword,
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          alert("Senha atualizada!");
          router.push("/home");
        } else {
          alert("Erro ao atualizar senha!");
        }
      })
      .catch((err) => {
        alert("Erro ao atualizar senha!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-4 rounded-xl w-[34vw] flex flex-col justify-start items-start h-auto bg-secondary text-secondary-foreground shadow-md">
          <span className="font-bold">SENHA</span>
          <span className="font-semibold">Senha de acesso ao sistema.</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar senha</DialogTitle>
          <DialogDescription>
            Altere sua senha aqui. Clique em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4 relative">
            <Label htmlFor="currentPassword" className="text-right">
              Senha atual
            </Label>
            <div className="relative col-span-3">
              <Input
                id="currentPassword"
                type={showPassword.currentPassword ? "text" : "password"}
                {...register("currentPassword")}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => togglePasswordVisibility("currentPassword")}
              >
                {showPassword.currentPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </Button>
            </div>
            {errors.currentPassword && (
              <p className="col-span-4 text-red-500 text-sm">
                {errors.currentPassword.message?.toString()}
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4 relative">
            <Label htmlFor="newPassword" className="text-right">
              Nova senha
            </Label>
            <div className="relative col-span-3">
              <Input
                id="newPassword"
                type={showPassword.newPassword ? "text" : "password"}
                {...register("newPassword")}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => togglePasswordVisibility("newPassword")}
              >
                {showPassword.newPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </Button>
            </div>
            {errors.newPassword && (
              <p className="col-span-4 text-red-500 text-sm">
                {errors.newPassword.message?.toString()}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">Salvar alterações</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
