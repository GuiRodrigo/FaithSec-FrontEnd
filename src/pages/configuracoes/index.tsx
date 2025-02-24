import { CardProfile } from "@/components/compounds/CardProfile";
import ContactDialog from "@/components/compounds/ContactCard";
import { Drawer } from "@/components/compounds/Drawer";
import { DialogPassword } from "@/components/compounds/EditProfileAdmin";
import UserInfoDialog from "@/components/compounds/UserInfoDialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Settings() {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  return (
    <div className="w-[100vw] max-w-[100vw] h-[100vh] flex relative">
      <Drawer />
      <ScrollArea className="flex-1 h-[100vh]">
        <div className="w-full min-h-[100vh] flex justify-center gap-6 items-center bg-primary px-6 py-12">
          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-xl w-[34vw] flex flex-col bg-secondary text-secondary-foreground shadow-md">
              <span className="font-bold">ATUALIZAÇÃO</span>
              <span className="font-semibold">Atualização do sistema Web</span>
            </div>
            <ContactDialog />
            <div className="p-4 rounded-xl w-[34vw] flex flex-col bg-secondary text-secondary-foreground shadow-md">
              <span className="font-bold">IDIOMA</span>
              <span className="font-semibold">Idioma da região.</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <DialogPassword />
            <div className="p-4 rounded-xl w-[34vw] flex flex-col bg-secondary text-secondary-foreground shadow-md">
              <span className="font-bold">TEMA</span>
              <span className="font-semibold">Cores, tema.</span>
            </div>
            <UserInfoDialog />
          </div>
        </div>
        <CardProfile />
      </ScrollArea>
    </div>
  );
}
