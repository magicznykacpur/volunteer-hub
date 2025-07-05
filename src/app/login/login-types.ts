import { User } from "@/generated/prisma";

export type LoginFormType = { email: string; password: string };

export type LoginActionPayload = {
  token: string;
  user: User;
};

export type LoginActionErrorPayload = {
  errorMessage: string;
};

export function isLoginError(
  result: LoginActionPayload | LoginActionErrorPayload
): result is LoginActionErrorPayload {
  return (result as any)?.errorMessage !== undefined;
}

export function isLoginValid(
  result: LoginActionPayload | LoginActionErrorPayload
): result is LoginActionPayload {
  return (
    (result as any)?.user !== undefined && (result as any)?.token !== undefined
  );
}
