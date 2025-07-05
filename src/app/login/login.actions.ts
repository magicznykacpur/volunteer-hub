"use server";

import { prisma } from "@/config/prisma.config";
import { createSession } from "@/lib/session";
import { compareSync } from "bcrypt-ts";
import { redirect } from "next/navigation";
import {
  LoginActionErrorPayload,
  LoginFormType
} from "./login-types";

const loginActionErrorPayload = { errorMessage: "Email or password incorrect" };

export default async function login({
  email,
  password,
}: LoginFormType): Promise<LoginActionErrorPayload | void> {
  try {
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      return loginActionErrorPayload;
    }

    const passwordValid = compareSync(password, user.hashedPassword);
    if (!passwordValid) {
      return loginActionErrorPayload;
    }

    await createSession(user.id);
  } catch (e: unknown) {
    console.error(e);
    return { errorMessage: (e as Error).message };
  }

  redirect("/dashboard")
}
