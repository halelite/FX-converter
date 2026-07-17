"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeSwitchButton = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      aria-label="Toggle theme"
      variant="ghost"
      className="bg-transparent! text-foreground! size-6.5! sm:size-8!"
      onClick={() => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
      }}
    >
      {theme === "dark" ? (
        <SunIcon className="size-4!" />
      ) : (
        <MoonIcon className="size-4!" />
      )}
    </Button>
  );
};

export default ThemeSwitchButton;
