"use server";

import { prisma } from "@/config/prisma.config";
import { clearSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function logout() {
  await clearSession();
  redirect("/");
}

export async function getOpportunites() {
  return prisma.opportunity.findMany();
}
