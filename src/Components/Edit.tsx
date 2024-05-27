import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import JobTitles from "../../public/JobTitles.json";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { GenericComboBox } from "./generic/GenericComboBox";
import { Combobox } from "./ComboBox";

import salaries from "../../public/Salaries.json";


const title = ['Title' ,'Salary']

export function Edit() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Edit</Button>
      </PopoverTrigger>
      <PopoverContent className=" w-[340px]">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">MyJobs</h4>
            <p className="text-sm text-muted-foreground">Edit</p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">{title[0]}</Label>
              {/* <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              /> */}
              <Combobox data={JobTitles} title={'Title'} />
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">{title[1]}</Label>
              {/* <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              /> */}
              <Combobox data={salaries} title={'Salary'}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="Company-Name">Company Name</Label>
              <Input
                id="Company-Name"
                placeholder="..."
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
