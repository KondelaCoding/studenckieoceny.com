'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import axios from 'axios';
import { useState, useEffect } from 'react';

export function Combobox({
  data,
  title,
  onChange,
}: {
  data: string;
  title: string;
  onChange: (value: { id: string; name: string }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<{ id: string; name: string } | null>(null);
  const [dataArray, setDataArray] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (data === 'universities') {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/universities`);

        const data = response.data.universities;
        console.log('Fetched universities:', data);
        setDataArray(data);
      }
    }
    fetchData();
  }, [data]);

  const handleSelect = (currentValue: string) => {
    if (currentValue === value?.name) {
      setValue(null);
      onChange({ id: '', name: '' });
      setOpen(false);
    } else {
      const newValue = dataArray.find((item) => item.name === currentValue);
      setValue(newValue || null);
      if (newValue) {
        onChange(newValue);
      }
      setOpen(false);
    }
  };

  console.log(dataArray);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="justify-between bg-card"
              >
                {value
                  ? dataArray.find((item) => item.name === value.name)?.name.slice(0, 15) +
                    ((dataArray.find((item) => item.name === value.name)?.name.length ?? 0 > 15)
                      ? '...'
                      : '')
                  : 'Wybierz ' + title}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          {value ? (
            <TooltipContent>
              <p>{value.name}</p>
            </TooltipContent>
          ) : null}
        </Tooltip>
      </TooltipProvider>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Szukaj ${title}...`} className="h-9" />
          <CommandList>
            <CommandEmpty>Nie znaleziono {title}.</CommandEmpty>
            <CommandGroup>
              {dataArray.map((item) => (
                <CommandItem key={item.id} value={item.name} onSelect={handleSelect}>
                  {item.name}
                  <Check
                    className={cn(
                      'ml-auto',
                      value?.name === item.name ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default Combobox;
