import { createCookieSessionStorage } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: "__session",
        secrets: ["your-secret"],
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7日
    },
});

export const { getSession, commitSession, destroySession } = sessionStorage;