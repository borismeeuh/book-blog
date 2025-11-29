import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
    matcher: ["/((?!_next|favicon.ico).*)"],
};

export function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (pathname === "/") {
        return NextResponse.redirect(new URL("/nl", req.url));
    }

    if (pathname === "/blogs") {
        return NextResponse.redirect(new URL("/nl/blogs", req.url));
    }

    return NextResponse.next();
}
