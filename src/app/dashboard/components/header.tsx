"use client";

import { logout } from "@/app/dashboard/dashboard.actions";
import ThemeToggle from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
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
import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Header() {
  const { user, setUser } = useBoundStore();

  const handleLogout = async () => {
    await logout();
  };

  const fetchUser = async () => {
    if (!user) {
      const fetchedUser = await getMe();
      fetchedUser && setUser(fetchedUser);
    }
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
