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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Role } from "@/generated/prisma";
import { capitalize } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod/v4";
import { SignupActionPayload, SignupFormType } from "./sign-up-types";
import signUp from "./sign-up.actions";
import { toast } from "react-toastify";

type LoginFormProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const schema = z.object({
  email: z.email("Email format invalid"),
  password: z.string().min(1, "You must provide a password"),
  role: z.enum([Role.ORGANIZATION, Role.VOLUNTEER], {
    message: "You must select a role",
  }),
});

export default function SignupForm({ open, setOpen }: LoginFormProps) {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      role: Role.VOLUNTEER,
    },
  });

  const onSubmit = async (signupForm: SignupFormType) => {
    const result: SignupActionPayload = await signUp(signupForm);

    if (result.errorMessage) {
      toast.error(result.errorMessage);
      console.error(result.errorMessage)
      return;
    } else {
      toast.success("Your account has been created! You can now login.")
    }
  };

  const emailError = form.formState.errors["email"]?.message;
  const passwordError = form.formState.errors["password"]?.message;
  const roleError = form.formState.errors["role"]?.message;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col sm:max-w-[425px]">
        <DialogHeader className="flex items-center mb-4">
          <DialogTitle>Sign up</DialogTitle>
          <DialogDescription>
            Provide your email, password and select a role to create an account
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
          <Select {...form.register("role")}>
            <SelectTrigger className="w-[240px]" aria-invalid={!!roleError}>
              <SelectValue placeholder={capitalize(form.getValues("role"))} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Roles</SelectLabel>
                {Object.values(Role).map((role, index) => (
                  <SelectItem key={`role-${index}`} value={role}>
                    {capitalize(role)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <DialogFooter className="flex justify-end mt-4">
            <Button type="submit" size="lg" className="w-1/3">
              Sign up
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
