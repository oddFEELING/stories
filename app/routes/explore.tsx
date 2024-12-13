import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import React from "react";
import useProfile from "~/hooks/use-profile";

type ComponentProps = {};

const ExplorePage: React.FC<ComponentProps> = ({}) => {
  const { profile } = useProfile();

  return (
    <div className="w-full h-svh flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* ~ ======= Decorative background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />

      {/* ~ ======= Icon container with enhanced animation */}
      <motion.span
        initial={{ scale: 0.9, rotate: -10 }}
        animate={{
          scale: 1,
          rotate: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        }}
        className="rounded-full p-6 mb-8 border-2 shadow-lg backdrop-blur-lg relative"
      >
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 rounded-full border-2 border-dashed border-muted-foreground/20"
        />
        <Compass
          size={40}
          strokeWidth={1.5}
          className="text-muted-foreground relative z-10"
        />
      </motion.span>

      {/* ~ ======= Content section with enhanced animations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center space-y-4 max-w-md relative z-10"
      >
        <h2 className="text-3xl font-semibold tracking-tight">
          Explore Coming Soon
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          We're crafting an immersive space where stories come alive. Soon
          you'll be able to discover extraordinary tales from our growing
          community of storytellers.
        </p>
        <motion.div
          className="w-16 h-0.5 bg-muted-foreground/30 mx-auto mt-6"
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </motion.div>
    </div>
  );
};

export default ExplorePage;
