"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const Socials = () => {
  const onClick = async (provider: "google" | "github") => {
    await signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div>
      <div className="flex flex-col gap-2">
        <Button type="button" variant="outline" onClick={() => onClick("github")} className="w-full">
          Zaloguj się przez Github
        </Button>
        <Button type="button" variant="outline" onClick={() => onClick("google")} className="w-full">
          Zaloguj się przez Google
        </Button>
      </div>
    </div>
  );
};

export default Socials;
