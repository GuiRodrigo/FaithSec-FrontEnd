import { CardProfile } from "@/components/compounds/CardProfile";
import { Drawer } from "@/components/compounds/Drawer";

export default function Home() {
  return (
    <div className="flex h-[100vh] w-[100vw]">
      <Drawer isExpanded />
      <div className="w-full flex flex-col relative justify-center items-center bg-primary  h-full">
        <div className="rounded-3xl absolute opacity-20 bg-primary-foreground w-[45vw] h-[65vh] "></div>
        <div className=" flex flex-col z-10 ">
          <img
            src="logo_faithsec.png"
            className="w-72 self-center mt-10"
            alt="logo"
          />
          <div className="flex flex-col self-center justify-between flex-1 pb-20">
            <h1 className="text-4xl text-foreground text-center">
              FAITH<b>SEC</b>
            </h1>
            <span className="text-lg">
              <b>SEGURANÇA E CONFIANÇA PARA SUA EMPRESA E CLIENTE</b>
            </span>
          </div>
        </div>
      </div>
      <CardProfile />
    </div>
  );
}
