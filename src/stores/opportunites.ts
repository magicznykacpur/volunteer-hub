import { Opportunity, User } from "@prisma/client";
import { StateCreator } from "zustand";

export type OpportunitesSlice = {
  opportunites?: Opportunity[];
  setOpportunites: (opportunites: Opportunity[]) => void;
};

export const createOpportunitesSlice: StateCreator<
  OpportunitesSlice,
  [],
  [],
  OpportunitesSlice
> = (set) => ({
  setOpportunites: (opportunites: Opportunity[]) =>
    set(() => ({ opportunites })),
});
