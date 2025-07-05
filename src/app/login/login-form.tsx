"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { emailRegexp } from "@/lib/regular-expressions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  isLoginError,
  LoginActionErrorPayload,
  LoginActionPayload,
  LoginFormType,
} from "./login-types";
import login from "./login.actions";
import { toast } from "react-toastify";

type LoginFormProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const schema = z.object({
  email: z.string().regex(emailRegexp, "Email format invalid"),
  password: z.string().min(1, "You must provide a password"),
});

export default function LoginForm({ open, setOpen }: LoginFormProps) {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (loginForm: LoginFormType) => {
    const result: LoginActionErrorPayload | LoginActionPayload = await login(
      loginForm
    );

    if (isLoginError(result)) {
      toast.error(result.errorMessage);
      return;
    } else {
      console.log("success.");
    }
  };

  const emailError = form.formState.errors["email"]?.message;
  const passwordError = form.formState.errors["password"]?.message;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col sm:max-w-[425px]">
        <DialogHeader className="flex items-center mb-4">
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Provide your email and password to login
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="relative mb-5">
            <Input
              placeholder="email"
              {...form.register("email")}
              aria-invalid={!!emailError}
              error={emailError}
            />
          </div>
          <div className="relative mb-5">
            <Input
              placeholder="password"
              type="password"
              {...form.register("password")}
              aria-invalid={!!passwordError}
              error={passwordError}
            />
          </div>
          <DialogFooter className="flex justify-end mt-4">
            <Button type="submit" size="lg" className="w-1/3">
              Login
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
