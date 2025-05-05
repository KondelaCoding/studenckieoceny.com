import { auth } from "@/auth";
import {
    apiAuthPrefix,
    apiPrefix,
    authRoutes,
    DEFAULT_LOGIN_REDIRECT,
    publicRoutes,
} from "@/routes";

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.some((route) =>
        typeof route === "string"
            ? route === nextUrl.pathname
            : route instanceof RegExp && route.test(nextUrl.pathname)
    );
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isApiRoute = nextUrl.pathname.startsWith(apiPrefix);

    if (isApiAuthRoute) {
        return; // Allow API auth routes
    }

    if (isApiRoute) {
        return; // Allow API routes
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(
                new URL(DEFAULT_LOGIN_REDIRECT, nextUrl),
            );
        }
        return; // Allow auth routes for unauthenticated users
    }

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL("/login", nextUrl));
    }
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
