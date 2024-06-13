import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import SelectProps from "../types/SelectProps";

export default function GenericSelect({ placeholder, data }: SelectProps) {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {data.map((item) => (
          <SelectItem key={item} value={`${item}`}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
