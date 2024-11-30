"use client";
import React from "react";
import { Button } from "~/components/ui/button";
import { Check, Compass, Laptop, Menu, Moon, Sun } from "lucide-react";
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
import { cn } from "~/lib/utils";
import { useTheme } from "~/components/layouts/theme-provider";
import { NavLink, useLocation } from "react-router";
import { motion } from "framer-motion";

type ComponentProps = {
  scrollValue: number;
};

const LandingNavBar: React.FC<ComponentProps> = ({ scrollValue }) => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  // ~ =============================================>
  // ~ ======= Navigation menu items with proper handlers
  // ~ ==============================================>
  const handleReadingClick = () => {
    // Add reading navigation logic
  };

  const handleSignIn = () => {
    // Add sign in logic
  };

  // ~ ======= Additional handler functions for new menu items
  const handleLibrary = () => {
    // Add library navigation logic
  };

  const handleSettings = () => {
    // Add settings navigation logic
  };

  const handleHelp = () => {
    // Add help center navigation logic
  };

  return (
    <div
      className={cn(
        "z-10 absolute top-0 w-full h-16 px-5 md:px-12 lg:px-20 flex items-center justify-between",
        scrollValue < 5 ? "bg-transparent" : "bg-background shadow-lg border-b",
      )}
    >
      {/* Logo Section */}
      <div className="flex items-center gap-4">
        <NavLink to="/">
          <p className="text-xl font-bold">M&middot;Story</p>
        </NavLink>

        <motion.nav
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="items-center gap-4 border-l hidden md:flex pl-4"
        >
          {navLinks.map((link) => (
            <NavLink to={link.to} key={link.to}>
              <span className="flex flex-col items-center gap-0.5">
                {link.label}
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={
                    location?.pathname === link.to
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 10 }
                  }
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={cn(
                    "h-1 w-1 rounded-full bg-primary opacity-0 hover:opacity-100 hover:w-full",
                  )}
                />
              </span>
            </NavLink>
          ))}
        </motion.nav>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-4">
        <NavLink to="/explore">
          {" "}
          <Button onClick={handleReadingClick}>
            <Compass size={18} strokeWidth={1.2} />
            Explore
          </Button>
        </NavLink>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline">
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>App Menu</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* Reading Group */}
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleLibrary}>
                My Library
              </DropdownMenuItem>
              <DropdownMenuItem>Recent Stories</DropdownMenuItem>
              <DropdownMenuItem>Bookmarks</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            {/* Account Group */}
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleSignIn}>
                Sign in
              </DropdownMenuItem>
              <DropdownMenuItem>Create Account</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            {/* Settings & Support Group */}
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleSettings}>
                Settings
              </DropdownMenuItem>
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
              <DropdownMenuItem onClick={handleHelp}>
                Help Center
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default LandingNavBar;

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/create", label: "Create" },
  { to: "/library", label: "My Library" },
];
