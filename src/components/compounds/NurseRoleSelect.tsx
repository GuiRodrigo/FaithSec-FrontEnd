import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const nurseRoles = [
  "Técnico de Enfermagem",
  "Técnico de Enfermagem do Trabalho",
  "Técnico de Enfermagem em UTI",
  "Técnico de Enfermagem em Pediatria",
  "Técnico de Enfermagem Cirúrgico",
  "Enfermeiro Assistencial",
  "Enfermeiro Obstetra",
  "Enfermeiro Pediátrico",
  "Enfermeiro Intensivista (UTI)",
  "Enfermeiro do Trabalho",
  "Enfermeiro Cirúrgico",
  "Enfermeiro Home Care",
  "Enfermeiro de Saúde Pública",
  "Enfermeiro de Educação Continuada",
  "Coordenador de Enfermagem",
  "Supervisor de Enfermagem",
  "Gerente de Enfermagem",
  "Diretor de Enfermagem",
];

function NurseRoleSelect({
  onChange,
  value,
}: {
  onChange: (value: string | undefined) => void;
  value: string | undefined;
}) {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecione um cargo" />
      </SelectTrigger>
      <SelectContent>
        {nurseRoles.map((role) => (
          <SelectItem key={role} value={role}>
            {role}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default NurseRoleSelect;
