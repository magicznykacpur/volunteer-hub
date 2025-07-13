import { prisma } from "@/config/prisma.config";
import { User } from "@prisma/client";
import { cookies } from "next/headers";
import { descryptToken } from "@/lib/session";

export default async function useUser(): Promise<User | null> {
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
