import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User, Briefcase, CreditCard } from "lucide-react";
import { useAuth } from "@/hooks/auth";

export default function UserInfoDialog() {
  const { userData } = useAuth();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-4 rounded-xl w-[34vw] flex flex-col justify-start items-start h-auto bg-secondary text-secondary-foreground shadow-md">
          <span className="font-bold">USUÁRIO</span>
          <span className="font-semibold">Veja suas informações pessoais</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações do Usuário</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <User size={20} />
            <span>{userData?.nome}</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase size={20} />
            <span>{userData?.cargo}</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard size={20} />
            <span>{userData?.nfc ?? "123456"}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
