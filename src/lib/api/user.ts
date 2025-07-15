"use server";

import { prisma } from "@/config/prisma.config";
import { descryptToken } from "@/lib/session";
import { cookies } from "next/headers";

export async function getMe() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  const jwtPayload = await descryptToken(session!.value);

  const userId = jwtPayload!.userId as string;
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    return null;
  }

  return user;
}

