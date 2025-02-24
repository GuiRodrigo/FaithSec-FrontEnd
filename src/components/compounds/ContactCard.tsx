import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Instagram, Phone, Linkedin, Mail } from "lucide-react";

export default function ContactDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-4 rounded-xl w-[34vw] flex flex-col justify-start items-start h-auto bg-secondary text-secondary-foreground shadow-md">
          <span className="font-bold">CONTATO</span>
          <span className="font-semibold">
            Dúvidas? Problemas? Entre em contato com a FaithSec.
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Meios de Contato</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Instagram size={20} />
            <span>@FaithSec</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={20} />
            <span>(00) 12345-6789</span>
          </div>
          <div className="flex items-center gap-2">
            <Linkedin size={20} />
            <span>linkedin.com/in/faithsec</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={20} />
            <span>faithsec@example.com</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
