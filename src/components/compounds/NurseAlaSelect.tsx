import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const nurseAla = ["Internação Geral", "UTI", "nenhum"];

function NurseAlaSelect({
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
        {nurseAla.map((role) => (
          <SelectItem key={role} value={role}>
            {role}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default NurseAlaSelect;
