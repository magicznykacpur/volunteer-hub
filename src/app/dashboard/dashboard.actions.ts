"use server";

import { prisma } from "@/config/prisma.config";
import { clearSession } from "@/lib/session";
import { redirect } from "next/navigation";

export const logout = async () => {
  await clearSession();
  redirect("/");
};

export const getOpportunites = async () => {
  return prisma.opportunity.findMany();
};
