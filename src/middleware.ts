import { NextResponse } from "next/server";

export const config = {
    matcher: ['/((?!_next|favicon.ico).*)'],
};

export function middleware(req: Request) {

    const url = new URL(req.url);

    if (url.pathname === "/") {
        url.pathname = "/nl";
        return NextResponse.redirect(url);
    }

    if (url.pathname === "/blogs") {
        url.pathname = "/nl/blogs";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}
