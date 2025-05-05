"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { LogIn, Loader2, TriangleAlert, Smile } from "lucide-react";
import { Button } from "./ui/button";
import { login } from "@/actions/login";
import { useTransition, useState } from "react";
import { LoginSchema } from "@/schemas";
import Link from "next/link";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(async () => {
      const result = await login(values);

      if (result?.error) {
        setErrorMessage(result.error);
        setSuccessMessage(null);
      } else {
        setSuccessMessage("Zalogowano pomyślnie!");
        setErrorMessage(null);
      }
    });
  };
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="inline-flex items-center gap-2">
          <LogIn />
          Logowanie
        </CardTitle>
        <CardDescription>Wprowadź swoje dane logowania</CardDescription>
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
            {errorMessage && (
              <div className="bg-destructive p-5 text-sm rounded-xl inline-flex items-center gap-2 w-full">
                <TriangleAlert />
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="bg-green-600 p-5 text-sm rounded-xl inline-flex items-center gap-2 w-full">
                <Smile />
                {successMessage}
              </div>
            )}
            <Button type="submit" className="w-full mt-5" disabled={isPending}>
              {isPending ? <Loader2 className="animate-spin" /> : <LogIn />}
              <span className="hidden sm:block">Zaloguj się</span>
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="/forgot-password" className="text-sm text-primary underline hover:underline">
          Zapomniałeś hasła?
        </Link>
        <Link href="/rejestracja" className="text-sm text-primary underline hover:underline">
          Nie masz konta? Zarejestruj się
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
