"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import SignupForm from "./sign-up-form";

export default function SignupManager() {
  const [open, setOpen] = useState(false);

  const handleLoginClick = () => setOpen(true);

  return (
    <>
      <Button className="w-2/5" onClick={handleLoginClick}>
        Sign up
      </Button>

      <SignupForm open={open} setOpen={setOpen} />
    </>
  );
}
