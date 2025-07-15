"use client";

import { logout } from "@/app/dashboard/dashboard.actions";
import ThemeToggle from "@/components/theme/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getMe } from "@/lib/api/user";
import { useBoundStore } from "@/stores/bound-store";
import { Role } from "@prisma/client";
import { Loader2, Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type FetchingUser = "fetching" | "success" | "error";

export default function Header() {
  const [isFetchingUser, setIsFetchingUser] =
    useState<FetchingUser>("fetching");
  const { user, setUser } = useBoundStore();

  const handleLogout = async () => {
    setIsFetchingUser("fetching");
    setUser(undefined);
    await logout();
  };

  const fetchUser = async () => {
    if (!user) {
      setIsFetchingUser("fetching");

      const fetchedUser = await getMe();

      if (fetchedUser) {
        setIsFetchingUser("success");
        setUser(fetchedUser);
        return;
      }

      setIsFetchingUser("error");
    }

    setIsFetchingUser("success");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <header
      className="flex justify-between items-center p-6 bg-zinc-600 text-white"
      suppressHydrationWarning
    >
      <strong>VolunteerHub</strong>

      <div className="flex items-center">
        <ThemeToggle />

        {isFetchingUser === "fetching" && (
          <Loader2 size={24} className="ml-5 animate-spin" />
        )}

        {user && (
          <>
            <strong className="ml-4">{user.email}</strong>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Menu className="ml-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-4 my-1 mr-6">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href={"/dashboard/profile"}>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </Link>
                  {user.role === Role.VOLUNTEER && (
                    <DropdownMenuItem>My Applications</DropdownMenuItem>
                  )}
                  {user.role === Role.ORGANIZATION && (
                    <DropdownMenuItem>Opportunites</DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={handleLogout}
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </header>
  );
}
