import { useAuth } from "@/hooks/auth";
import api from "@/service/api";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const { nourseData } = useAuth();
  const router = useRouter();

  function handleLogin() {
    setIsLoading(true);
    api
      .post("/login-enfermeiro", {
        nome: nourseData?.nome,
        senha: nourseData?.senha,
        nfc: 0,
      })
      .then((res) => {
        if (res.data.success) {
          router.push("/celular/prontuarios");
        } else {
          alert("Login inválido");
        }
      })
      .catch((err) => {
        alert("Login inválido");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (nourseData) {
      router.push("/celular/login/nfc");
    } else {
      router.push("/celular/login");
    }
  }, []);

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center p-4 bg-[#87AFC7]">
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
  );
}
