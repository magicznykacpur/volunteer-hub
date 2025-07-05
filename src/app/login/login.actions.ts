"use server";

import { prisma } from "@/config/prisma.config";
import { compareSync } from "bcrypt-ts";
import {
  LoginActionErrorPayload,
  LoginActionPayload,
  LoginFormType,
} from "./login-types";

const loginActionErrorPayload = { errorMessage: "Email or password incorrect" };

export default async function login({
  email,
  password,
}: LoginFormType): Promise<LoginActionPayload | LoginActionErrorPayload> {
  try {
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      return loginActionErrorPayload;
    }

    const passwordValid = compareSync(password, user.hashedPassword);
    if (!passwordValid) {
      return loginActionErrorPayload;
    }

    return { token: "jwt_token", user };
  } catch (e: unknown) {
    console.error(e);
    return { errorMessage: (e as Error).message };
  }
}
