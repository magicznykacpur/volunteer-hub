import { User } from "@prisma/client";
import { StateCreator } from "zustand";

export type UserSlice = {
  user?: User;
  setUser: (user: User) => void;
};

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (
  set
) => ({
  setUser: (user: User) => set((state) => ({ ...state, user: user })),
});
