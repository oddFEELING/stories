"use client";
import React from "react";
import { cn } from "~/lib/utils";
import { NavLink, useLocation } from "react-router";
import {
  Check,
  Compass,
  DatabaseZap,
  Home,
  Laptop,
  Library,
  Menu,
  Moon,
  PlusSquare,
  Sun,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useTheme } from "../layouts/theme-provider";
import useProfile from "~/hooks/use-profile";

// ~ =============================================>
// ~ ======= Interface for nav items
// ~ ==============================================>
interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { theme, setTheme } = useTheme();
  const { profile } = useProfile();

  // ~ ======= Define navigation items
  const navItems: NavItem[] = [
    { icon: <Home size={30} />, label: "Home", href: "/" },
    { icon: <PlusSquare size={30} />, label: "Create", href: "/create" },
    { icon: <Compass size={45} />, label: "Explore", href: "/explore" },
    { icon: <Library size={30} />, label: "Library", href: "/library" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t h-16 px-4 md:hidden">
      <div className="flex items-center justify-around h-full relative">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          const isExplore = item.label === "Explore";

          return (
            <NavLink key={item.label} to={item.href}>
              <Button
                variant={isExplore ? "default" : "ghost"}
                size={isExplore ? "lg" : "icon"}
                className={cn(
                  "flex flex-col items-center gap-1 ",
                  isExplore &&
                    "absolute -top-5 left-1/2 transform -translate-x-1/2 rounded-full p-6",
                  isActive && !isExplore && "text-primary",
                )}
              >
                {item.icon}
                <span className={cn("text-sm", isExplore && "hidden")}>
                  {item.label}
                </span>
              </Button>
            </NavLink>
          );
        })}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Your zaps</DropdownMenuLabel>
            <DropdownMenuItem>
              <DatabaseZap size={20} strokeWidth={1.2} />
              <span>zaps</span>
              <DropdownMenuShortcut>
                {profile?.zap_cells || 0}
              </DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuLabel>App menu</DropdownMenuLabel>

            {/* Reading Group */}
            <DropdownMenuGroup>
              <DropdownMenuItem>Recent Stories</DropdownMenuItem>
              <DropdownMenuItem>Bookmarks</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            {/* Account Group */}
            <DropdownMenuGroup>
              <DropdownMenuItem>Sign in</DropdownMenuItem>
              <DropdownMenuItem>Create Account</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            {/* Settings & Support Group */}
            <DropdownMenuGroup>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="w-36">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      <Sun size={16} strokeWidth={1.2} />
                      Light
                      {theme === "light" && (
                        <DropdownMenuShortcut>
                          <Check size={16} strokeWidth={1} />{" "}
                        </DropdownMenuShortcut>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      <Moon size={16} strokeWidth={1.2} />
                      Dark
                      {theme === "dark" && (
                        <DropdownMenuShortcut>
                          <Check size={16} strokeWidth={1} />{" "}
                        </DropdownMenuShortcut>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      <Laptop size={16} strokeWidth={1} />
                      System
                      {theme === "system" && (
                        <DropdownMenuShortcut>
                          <Check size={16} strokeWidth={1} />{" "}
                        </DropdownMenuShortcut>
                      )}
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>Help Center</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default MobileBottomNav;
