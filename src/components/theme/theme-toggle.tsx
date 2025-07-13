"use client";

import { cn } from "@/lib/utils";
import { LucideMoon, LucideSun } from "lucide-react";
import { useTheme } from "next-themes";

type ThemeToggleProps = {
  className?: string;
};

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { setTheme } = useTheme();

  return (
    <div className={cn("cursor-pointer", className)}>
      <LucideSun
        width="1.2rem"
        className="rotate-0 transition-all dark:hidden hover:animate-pulse"
        onClick={() => setTheme("dark")}
      />
      <LucideMoon
        width="1.2rem"
        className="dark:rotate-0 hidden dark:block hover:animate-pulse"
        onClick={() => setTheme("light")}
      />
    </div>
  );
}
