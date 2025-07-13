"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/app/dashboard/dashboard.actions";
import { Role, User } from "@prisma/client";
import { Menu } from "lucide-react";
import Link from "next/link";

type HeaderProps = {
  user: User;
};

export default function Header({ user }: HeaderProps) {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="flex justify-between items-center p-6 bg-gray-500 text-white">
      <strong>VolunteerHub</strong>

      <div className="flex">
        <strong>{user?.email}</strong>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Menu className="ml-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-4 my-1 mr-6 bg-gray-100">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href={"/dashboard/profile"}>
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              {user?.role === Role.VOLUNTEER && (
                <DropdownMenuItem>My Applications</DropdownMenuItem>
              )}
              {user?.role === Role.ORGANIZATION && (
                <DropdownMenuItem>Opportunites</DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
