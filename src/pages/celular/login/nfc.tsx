import { useState } from "react";
import { io } from "socket.io-client";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/service/api";
import { useAuth } from "@/hooks/auth";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/router";

export default function NFCVerification() {
  const [showInput, setShowInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nfcValue, setNfcValue] = useState("");
  const { nourseLogin, setNourseData } = useAuth();
  const router = useRouter();
  const socket = io("http://172.20.10.2:4000");

  function handleLogin() {
    if (nfcValue.trim() === "") {
      alert("Informe o número do seu crachá!");
      return;
    }
    setIsLoading(true);
    api
      .post("/login-enfermeiro", {
        cpf: nourseLogin?.cpf,
        senha: nourseLogin?.password,
        nfc: nfcValue,
      })
      .then((res) => {
        if (res.status === 200) {
          setNourseData(res.data);
          router.push("/celular/prontuarios");
          socket.emit("verificar-cracha", nfcValue);
        } else {
          console.log(res);
          alert("Login inválido");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 403) {
          alert("Seu crachá está desabilitado!");
          return;
        }
        alert("Login inválido");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center p-4 bg-[#87AFC7]">
      <h1 className="text-2xl font-bold mb-2 text-black">
        VERIFICAÇÃO DE DUAS ETAPAS
      </h1>
      <p className="mb-4 text-black bg-primary p-2 rounded">
        APROXIME SEU CRACHÁ COM NFC NA TELA
      </p>
      <p className="mb-4 text-black">2ª ETAPA</p>

      {/* Animação de sinal de Wi-Fi representando NFC */}
      <div onClick={() => setShowInput(true)} className="cursor-pointer py-10">
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-10 h-10 bg-black rounded-full"></div>
          <motion.div
            className="absolute w-16 h-16 border-2 border-black rounded-full"
            initial={{ opacity: 0.3, scale: 0.8 }}
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.8, 1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className="absolute w-24 h-24 border-2 border-black rounded-full"
            initial={{ opacity: 0.2, scale: 0.7 }}
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {showInput && (
        <>
          <Input
            className="mt-4 p-2 border-2 border-black"
            placeholder="Digite o código NFC"
            value={nfcValue}
            onChange={(e) => setNfcValue(e.target.value)}
          />
          <Button onClick={handleLogin} className="w-[30vw] mt-5">
            {isLoading ? <LoaderCircle className="animate-spin" /> : "Enviar"}
          </Button>
        </>
      )}

      <img
        src="/logo_faithsec_nome.png"
        className="w-16 mt-4"
        alt="Logo FaithSec"
      />
    </div>
  );
}
