import { Role } from "@/generated/prisma";

export type SignupFormType = { email: string; password: string; role: Role };

export type SignupActionPayload = {
  success: boolean;
  errorMessage?: string;
};
