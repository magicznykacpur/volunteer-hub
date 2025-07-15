"use server";

import { createUser } from "@/lib/api/user";
import { hashSync } from "bcrypt-ts";
import { SignupActionPayload, SignupFormType } from "./sign-up-types";

export default async function signUp({
  email,
  password,
  role,
}: SignupFormType): Promise<SignupActionPayload> {
  try {
    const hashedPassword = hashSync(password);

    await createUser(email, hashedPassword, role);

    return { success: true };
  } catch (e: unknown) {
    const errorMessage = (e as Error).message;

    if (errorMessage.includes("Unique constraint")) {
      return { success: false, errorMessage: "Email already taken" };
    }

    console.error(errorMessage);
    return { success: false, errorMessage };
  }
}
