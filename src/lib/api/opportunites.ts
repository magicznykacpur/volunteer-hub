"use server"

import { prisma } from "@/config/prisma.config";

export const getOpportunites = async () => {
  return prisma.opportunity.findMany();
};
