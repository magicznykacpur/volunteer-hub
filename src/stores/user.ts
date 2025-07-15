import { User } from "@prisma/client";
import { StateCreator } from "zustand";

export type UserSlice = {
  user?: User;
  setUser: (user: User | undefined) => void;
};

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (
  set
) => ({
  setUser: (user: User | undefined) => set(() => ({ user })),
});
