"use server";

import { prisma } from "@/config/prisma.config";
import { SignupActionPayload, SignupFormType } from "./sign-up-types";
import { hashSync } from "bcrypt-ts";

export default async function signUp({
  email,
  password,
  role,
}: SignupFormType): Promise<SignupActionPayload> {
  try {
    const hashedPassword = hashSync(password);

    await prisma.user.create({
      data: { email, hashedPassword, role, emailVerified: false },
    });

    return { success: true };
  } catch (e: unknown) {
    const errorMessage = (e as Error).message;

    console.error(errorMessage);
    return { success: false, errorMessage };
  }
}
