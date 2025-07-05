import { User } from "@/generated/prisma";

export type LoginFormType = { email: string; password: string };

export type LoginActionPayload = {
  token: string;
  user: User;
};

export type LoginActionErrorPayload = {
  errorMessage: string;
};
