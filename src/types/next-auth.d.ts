import type { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        role: "admin" | "user";
    }

    interface Session extends DefaultSession {
        user?: DefaultSession["user"] & {
            id: string;
            role: "admin" | "user";
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: "admin" | "user";
    }
}
