"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { Loader2, CirclePlus } from "lucide-react";
import { Button } from "./ui/button";
import { register } from "@/actions/register";
import { useTransition } from "react";
import { RegisterSchema } from "@/schemas";
import Link from "next/link";

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      register(values);
    });
  };
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="inline-flex items-center gap-2">
          <CirclePlus />
          Rejestracja
        </CardTitle>
        <CardDescription>Wprowadź swoje aby zarejestrować się do serwisu</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adres e-mail</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="jan.kowalski@gmail.com" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hasło</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Wpisz hasło" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Potwierdź hasło</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Wpisz hasło" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-5" disabled={isPending}>
              {isPending ? <Loader2 className="animation-spin" /> : <CirclePlus />}
              <span className="hidden sm:block">Stwórz konto</span>
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="/login" className="text-sm text-primary underline hover:underline">
          Masz już konto? Zaloguj się
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
