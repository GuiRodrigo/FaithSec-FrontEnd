import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/router";

export default function Home() {
  const { isLogged } = useAuth();
  const router = useRouter();

  return (
    <div className="w-[100vw] h-[100vh] bg-primary flex flex-col items-center justify-center flex-1">
      <div className="w-[60vw] flex flex-col z-10 h-[80vh] mb-10">
        <div className="rounded-3xl absolute opacity-20 bg-primary-foreground w-[60vw] h-[80vh]"></div>
        <div className=" flex max-w-full max-h-full flex-col z-10 ">
          <img
            src="logo_faithsec.png"
            className="w-80 self-center mt-10"
            alt="logo"
          />
          <div className="flex flex-col self-center justify-between flex-1 pb-20">
            <h1 className="text-4xl text-foreground text-center">
              FAITH<b>SEC</b>
            </h1>
            <span className="text-lg text-wrap">
              <b>SEGURANÇA E CONFIANÇA PARA SUA EMPRESA E CLIENTE</b>
            </span>
          </div>
        </div>
      </div>
      <Button
        onClick={() => router.push("/login")}
        className="bg-secondary active:bg-muted-foreground text-foreground font-bold text-lg px-10"
        type="button"
      >
        LOGIN
      </Button>
    </div>
  );
}
