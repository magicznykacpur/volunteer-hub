import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Role } from "@/generated/prisma";
import useUser from "@/lib/useUser";
import { Menu } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await useUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-100">
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
                <DropdownMenuItem>Profile</DropdownMenuItem>
                {user.role === Role.VOLUNTEER && (
                  <DropdownMenuItem>Applications</DropdownMenuItem>
                )}
                {user.role === Role.ORGANIZATION && (
                  <DropdownMenuItem>Opportunites</DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  );
}
