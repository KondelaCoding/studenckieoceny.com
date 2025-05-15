"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { UserPlus, Loader2, TriangleAlert, Smile } from "lucide-react";
import { Button } from "./ui/button";
import { useTransition, useState } from "react";
import { AddTeacherSchema } from "@/schemas";
import Combobox from "./Combobox";

const AddTeacherForm = () => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof AddTeacherSchema>>({
    resolver: zodResolver(AddTeacherSchema),
    defaultValues: {
      name: "",
      subjects: "",
      primaryUniversity: {
        id: 0,
        name: "",
      },
      secondaryUniversity: {
        id: 0,
        name: "",
      },
    },
  });

  const onSubmit = (values: z.infer<typeof AddTeacherSchema>) => {
    console.log("Form submitted", values);
    if (values.primaryUniversity.id === 0 && values.secondaryUniversity.id === 0) {
      setErrorMessage("Wybierz przynajmniej jedną uczelnię");
      setSuccessMessage(null);
      return;
    }
    startTransition(async () => {
      const result = await fetch("/api/teachers", {
        method: "POST",
        body: JSON.stringify({
          name: values.name,
          subjects: values.subjects,
          primaryUniversity: values.primaryUniversity.id,
          secondaryUniversity: values.secondaryUniversity.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      if (result?.error) {
        setErrorMessage(result.error);
        setSuccessMessage(null);
      } else {
        setSuccessMessage("Dodano zajęcia do bazy!");
        setErrorMessage(null);
      }
    });
  };
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="inline-flex items-center gap-2">
          <UserPlus />
          Dodaj zajęcia
        </CardTitle>
        <CardDescription>Jeśli nie znalazłeś zajęć, dodaj je do naszej bazy!</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imię prowadzącego</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Jan K" {...field} disabled={isPending} />
                  </FormControl>
                  <FormLabel className="text-primary">* Pamiętaj! NIE podawaj nazwiska</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subjects"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Przedmiot</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Fizyka, Probabilistyka" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="inline-flex w-full justify-between gap-x-2 flex-wrap gap-y-4">
              <FormField
                control={form.control}
                name="primaryUniversity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Uczelnia</FormLabel>
                    <FormControl>
                      <Combobox title="uczelnie" data="universities" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="secondaryUniversity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>&nbsp;</FormLabel>
                    <FormControl>
                      <Combobox title="uczelnie" data="universities" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {errorMessage && (
              <div className="bg-destructive p-5 text-sm rounded-xl inline-flex items-center gap-2 w-full">
                <TriangleAlert className="shrink-0" />
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="bg-green-600 p-5 text-sm rounded-xl inline-flex items-center gap-2 w-full">
                <Smile className="shrink-0" />
                {successMessage}
              </div>
            )}
            <Button type="submit" className="w-full mt-5" disabled={isPending}>
              {isPending ? <Loader2 className="animate-spin" /> : <UserPlus />}
              <span>Dodaj</span>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddTeacherForm;
