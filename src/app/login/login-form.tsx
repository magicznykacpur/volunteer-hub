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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod/v4";
import { LoginActionErrorPayload, LoginFormType } from "./login-types";
import login from "./login.actions";

type LoginFormProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const schema = z.object({
  email: z.email("Email format invalid"),
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
    const result: LoginActionErrorPayload | void = await login(loginForm);

    if (result && result.errorMessage) {
      toast.error(result.errorMessage);
      return;
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
