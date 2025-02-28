import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth"; // Adjust the path to your auth file

export default async function middleware(req: Request) {
    const session = await authOptions(); // Auth.js now provides an `auth` function

    const { pathname } = new URL(req.url);

    if (
        pathname.startsWith("/api/auth/") ||
        pathname === "/login" ||
        pathname === "/register"
    ) {
        return NextResponse.next();
    }

    if (pathname === "/" || pathname.startsWith("/api/videos")) {
        return NextResponse.next();
    }

    if (!session) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher:[
        /*
            * Match all request paths except:
            * - _next/static (static files)
            * - _next/image (image optimization files)
            * - favicon.ico (favicon file)
            * - public folder
        */
        "/((?!_next/static|_next/image|favicon.ico|public/).*)",
    ]
};