"use server"

import { clearSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function logout() {
  await clearSession();
  redirect("/");
}
