import { create } from "zustand";
import { createUserSlice, UserSlice } from "./user";
import { createOpportunitesSlice, OpportunitesSlice } from "./opportunites";

export const useBoundStore = create<UserSlice & OpportunitesSlice>()(
  (...a) => ({
    ...createUserSlice(...a),
    ...createOpportunitesSlice(...a),
  })
);
