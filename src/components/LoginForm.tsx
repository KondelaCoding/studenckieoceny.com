"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { LogIn, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { login } from "@/actions/login";
import { useTransition } from "react";
import { LoginSchema } from "@/schemas";
import Link from "next/link";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values);
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
            <Button type="submit" className="w-full mt-5" disabled={isPending}>
              {isPending ? <Loader2 className="animation-spin" /> : <LogIn />}
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
