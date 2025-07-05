import { descryptToken } from "@/lib/session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/dashboard"],
};

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  const jwtPayload = await descryptToken(session);

  if (!jwtPayload || !jwtPayload.userId) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
