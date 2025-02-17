import api from "@/service/api";
import { useEffect, useState } from "react";

import { PacienteType } from "./index";

export default function Paciente() {
  const [paciente, setPaciente] = useState<PacienteType>();

  useEffect(() => {
    api
      .get("/pacientes")
      .then((res) => {
        setPaciente(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div>
        <h1>{paciente?.nome}</h1>
      </div>
    </div>
  );
}
