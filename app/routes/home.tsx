import type { Route } from "./+types/home";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import HeroImg from "~/assets/illustrations/humanities/5.png";
import HeroBG from "~/assets/illustrations/humanities/13.png";
import { Button } from "~/components/ui/button";
import { ArrowRight, PenLine } from "lucide-react";
import Img1 from "~/assets/illustrations/humanities/1.png";
import Img4 from "~/assets/illustrations/humanities/27.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "My Story" },
    { name: "description", content: "Welcome to React Router!" },
    {
      name: "theme-color",
      content: "var(--background)",
    },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-svh w-full bg-background">
      {/* ####################################### */}
      {/* -- Hero section */}
      {/* ####################################### */}
      <section className="container max-w-7xl min-h-svh mx-auto relative px-4 py-20 md:py-32 flex items-center  justify-center">
        {/* ~ ======= Enhanced background effects */}
        <div className="absolute inset-0 hidden md:block">
          <div className="absolute right-0 top-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/4 rounded-full bg-primary/5 [filter:blur(120px)]" />
          <div className="absolute left-0 bottom-0 h-[500px] w-[500px] -translate-x-1/3 translate-y-1/4 rounded-full bg-secondary/5 [filter:blur(120px)]" />

          {/* ~ ======= Animated grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]" />
        </div>

        {/* ~ ======= Floating decorative images - Simplified to two larger images */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 pointer-events-none hidden md:block"
        >
          <motion.img
            src={Img1}
            alt=""
            animate={{
              opacity: [0, 0.8],
              x: [-80, 0],
              rotate: [-5, 5],
            }}
            transition={{
              duration: 1,
              delay: 1,
              ease: "easeOut",
            }}
            className="absolute w-28 h-28 -left-20 top-1/3 -mt-4 object-cover rounded-xl opacity-80"
          />
          <motion.img
            src={Img4}
            alt=""
            animate={{
              y: [20, 0, 20],
              rotate: [5, -5, 5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="absolute w-48 h-48 right-20 top-20 object-cover rounded-xl opacity-80"
          />
        </motion.div>

        <div className="grid relative items-center gap-12 md:grid-cols-2 lg:gap-20">
          {/* ~ ======= Enhanced content side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-8 text-center md:text-left"
          >
            <div className="space-y-6">
              {/* ~ ======= Animated title with sparkle effect */}
              <div className="relative inline-block">
                <h1 className="text-4xl font-black tracking-tight text-primary sm:text-6xl [text-wrap:balance]">
                  My Story
                </h1>
              </div>

              <p className="text-lg text-muted-foreground md:text-xl max-w-xl leading-relaxed">
                Embark on a journey where your stories come to life. Create,
                explore, and share meaningful narratives that captivate hearts
                and inspire minds.
              </p>
            </div>

            {/* ~ ======= Enhanced CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-4 md:justify-start"
            >
              <Button size="lg" className="group relative overflow-hidden">
                <span
                  className="relative z-10 flex items-center gap-2"
                  onClick={() => {
                    navigate("/create");
                  }}
                >
                  Create{" "}
                  <PenLine
                    size={18}
                    strokeWidth={1.5}
                    className="group-hover:rotate-12 transition-transform"
                  />
                </span>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="group gap-2 transition-colors"
              >
                Learn More
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          {/* ~ ======= Enhanced image side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden">
              <AspectRatio ratio={1}>
                <img
                  src={HeroImg}
                  alt="Hero illustration"
                  className="h-full w-full object-cover transition-transform duration-700"
                />
              </AspectRatio>
            </div>

            {/* ~ ======= Enhanced decorative elements */}
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                transition: { duration: 6, repeat: Infinity },
              }}
              className="absolute -bottom-10 -left-10 w-40 opacity-50"
            >
              <AspectRatio ratio={1}>
                <img
                  src={HeroBG}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </AspectRatio>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section>Yep That cat has seen it all.</section>
    </div>
  );
}
