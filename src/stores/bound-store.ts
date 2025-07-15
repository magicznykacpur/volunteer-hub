import { create } from "zustand";
import { createUserSlice, UserSlice } from "./user";

export const useBoundStore = create<UserSlice>()((...a) => ({
  ...createUserSlice(...a),
}));
