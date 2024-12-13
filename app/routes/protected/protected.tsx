import React, { useEffect } from "react";
import useProfile from "~/hooks/use-profile";
import { Outlet, useNavigate } from "react-router";
import { LibraryBig } from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";
import { Button } from "~/components/ui/button";
import { motion } from "framer-motion";

type ComponentProps = {};

const ProtectedRoutesLayout: React.FC<ComponentProps> = ({}) => {
  const navigate = useNavigate();
  const { profile, isLoading } = useProfile();

  useEffect(() => {
    // if (!isLoading && !profile) {
    //   navigate("/", { replace: true });
    // }
  });

  if (!isLoading && !profile) {
    return (
      <div className="w-full min-h-svh bg-background/50 flex flex-col items-center justify-center p-8">
        {/* ~ ======= Icon container with subtle animation */}
        <motion.span
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="rounded-full p-4 mb-6 border shadow backdrop-blur-sm"
        >
          <LibraryBig
            size={32}
            strokeWidth={1}
            className="text-muted-foreground/80"
          />
        </motion.span>

        {/* ~ ======= Content section with subtle animations */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3 max-w-md"
        >
          <h2 className="text-2xl font-medium tracking-tight">
            Your Personal Library
          </h2>
          <p className="text-muted-foreground text-sm">
            Sign in to access your collection of curated stories
          </p>

          <SignInButton mode="modal">
            <Button
              size="lg"
              className="mt-4 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              Get Started
            </Button>
          </SignInButton>
        </motion.div>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoutesLayout;
