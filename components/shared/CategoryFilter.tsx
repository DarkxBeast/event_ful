import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CategoryFilter = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Concerts</SelectItem>
        <SelectItem value="system">StandUp Pun</SelectItem>
        <SelectItem value="darks">Festivals</SelectItem>
        <SelectItem value="dark">Gatherings</SelectItem>
        <SelectItem value="lights">Cultural</SelectItem>
      </SelectContent>
    </Select>
  );
};
