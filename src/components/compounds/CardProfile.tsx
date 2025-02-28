import { useAuth } from "@/hooks/auth";
import { CircleUserRound } from "lucide-react";

export function CardProfile() {
  const { userData } = useAuth();

  return (
    <div className="flex border-2 bg-background w-56 h-20 justify-evenly items-center border-foreground absolute top-0 right-0">
      <div className="flex flex-col gap-1 justify-center items-center">
        <span className="font-bold flex-nowrap">{userData?.nome}</span>
        <span className="font-bold flex-nowrap">{userData?.cargo}</span>
      </div>
      <CircleUserRound size={40} />
    </div>
  );
}
