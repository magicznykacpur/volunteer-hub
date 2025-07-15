"use server";

import { prisma } from "@/config/prisma.config";
import { descryptToken } from "@/lib/session";
import { Role, User } from "@prisma/client";
import { cookies } from "next/headers";

export const getMe = async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  const jwtPayload = await descryptToken(session!.value);

  const userId = jwtPayload!.userId as string;
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    return null;
  }

  return user;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { email } });
};

export const createUser = async (
  email: string,
  hashedPassword: string,
  role: Role
) => {
  await prisma.user.create({
    data: { email, hashedPassword, role, emailVerified: false },
  });
};
