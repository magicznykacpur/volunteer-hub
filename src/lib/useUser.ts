import { prisma } from "@/config/prisma.config";
import { User } from "@/generated/prisma";
import { cookies } from "next/headers";
import { descryptToken } from "./session";

export default async function useUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session) {
    return null;
  }

  const jwtPayload = await descryptToken(session.value);
  if (!jwtPayload) {
    return null;
  }

  const userId = jwtPayload.userId as string;
  const user = await prisma.user.findFirst({ where: { id: userId } });

  if (!user) {
    return null;
  }

  return user;
}
