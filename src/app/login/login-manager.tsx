"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import LoginForm from "./login-form";

export default function LoginManager() {
  const [open, setOpen] = useState(false);

  const handleLoginClick = () => setOpen(true);

  return (
    <>
      <Button className="w-2/5" onClick={handleLoginClick}>
        Log in
      </Button>

      <LoginForm open={open} setOpen={setOpen} />
    </>
  );
}
