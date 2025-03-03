"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const universities = [
  {
    value: "harvard",
    label: "Harvard University",
  },
  {
    value: "stanford",
    label: "Stanford University",
  },
  {
    value: "mit",
    label: "Massachusetts Institute of Technology",
  },
  {
    value: "caltech",
    label: "California Institute of Technology",
  },
  {
    value: "oxford",
    label: "University of Oxford",
  },
  {
    value: "cambridge",
    label: "University of Cambridge",
  },
  {
    value: "ucl",
    label: "University College London",
  },
  {
    value: "imperial",
    label: "Imperial College London",
  },
  {
    value: "eth",
    label: "ETH Zurich",
  },
  {
    value: "ucb",
    label: "University of California, Berkeley",
  },
];

export function Combox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {value
            ? universities.find((university) => university.value === value)?.label.slice(0, 20) +
              (universities.find((university) => university.value === value)?.label?.length ?? 0 > 20 ? "..." : "")
            : "Select university..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search university..." className="h-9" />
          <CommandList>
            <CommandEmpty>No university found.</CommandEmpty>
            <CommandGroup>
              {universities.map((university) => (
                <CommandItem
                  key={university.value}
                  value={university.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {university.label}
                  <Check className={cn("ml-auto", value === university.value ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default Combox;
