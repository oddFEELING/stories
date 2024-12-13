import React, { useEffect, useState } from "react";
import type { Route } from "./+types/stories.story_id";
import { Button } from "~/components/ui/button";
import {
  BadgeCheck,
  ChevronLeft,
  Cog,
  FileText,
  ImageIcon,
  Loader,
  NotebookTabs,
} from "lucide-react";
import { motion } from "framer-motion";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { cn } from "~/lib/utils";
import { useQuery } from "@tanstack/react-query";
import {
  get_original_story_chapters,
  get_story_by_id,
} from "~/actions/story.action";
import StoryCharacterSection from "~/components/story-character-section";
import StoryThemeSection from "~/components/story-theme-section";
import PaperBackground from "~/components/paper-background-effect";
import { Story } from "../../_db.types";
import StorySettingsCollapsible from "~/components/story-settings-collapsible";
import StoryChapterList from "~/components/story-chapter-list";
import img1 from "~/assets/illustrations/humanities/20.png";
import useNowReading from "~/hooks/use-now-reading";
import { toast } from "sonner";
import useProfile from "~/hooks/use-profile";
import { useNavigate } from "react-router";

// ~ ======= Sample data based on schema -->
const sampleStory = {
  title: "The Chronicles of Faith",
  chapters: [
    {
      title: "Chapter 1: The Beginning",
      tagline: "Where it all starts",
      setup: {
        synopsis:
          "A journey of discovery begins in the heart of ancient times.",
      },
      pov_character: "Sarah",
      scenes: [
        {
          goal: "Introduce the main character and their world",
          setting: "Ancient marketplace",
          characters: ["Sarah", "Marcus", "Elder John"],
          conflict: "Cultural tensions rise as traditions clash",
          outcome: "A decision that changes everything",
        },
      ],
    },
  ],
  characterProfiles: [
    {
      new_name: "Sarah",
      biblical_role: {
        original_name: "Esther",
        role_description: "A young woman chosen for greatness",
      },
      core_traits: {
        personality: "Courageous and wise",
        motivations: ["Protect her people", "Find truth"],
      },
    },
  ],
  themes: [
    "Faith in adversity",
    "Cultural identity",
    "Personal transformation",
  ],
  coverArt: {
    url: "https://plus.unsplash.com/premium_photo-1721162880418-437b168999c4?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "The Chronicles of Faith Cover Art",
  },
};

type PageProps = {
  params: Route.LoaderArgs["params"];
};

// ~ =============================================>
// ~ ======= Main component  -->
// ~ =============================================>
const SingleStoryPage: React.FC<PageProps> = ({ params }) => {
  const { profile } = useProfile();
  const navigate = useNavigate();
  const {
    setShowNowReading,
    setCurrentTab,
    setCurrentStory,
    setCurrentChapter,
  } = useNowReading();
  const { story_id } = params;
  const {
    data: story,
    isLoading,
    refetch: reloadStory,
  } = useQuery({
    queryKey: ["Get single story", story_id],
    queryFn: async () => get_story_by_id(story_id),
  });

  // ~ ======= states  -->
  const [generateChapterLoading, setGenerateChapterLoading] =
    useState<boolean>(false);

  useEffect(() => {
    if (story) {
      setCurrentStory({
        _id: story._id,
        title: story.title,
        summary: story.summary,
        passage: story.passage,
        owner: story.owner,
        story_art: story.story_art,
      });
    }
  }, [story]);

  if (isLoading)
    return (
      <div className="w-full h-svh flex flex-col items-center justify-center text-center relative">
        <PaperBackground />
        <span className="rounded-lg p-2 bg-muted">
          <Loader size={25} strokeWidth={1.5} className="animate-spin" />
        </span>
        <p className="text-lg">Loading your stories</p>
      </div>
    );

  if ((!isLoading && !story) || story === undefined) {
    return <p>No stories</p>;
  }

  // ~ =============================================>
  // ~ ======= handle generate chapters   -->
  // ~ =============================================>
  const generateChapters = async () => {
    setGenerateChapterLoading(true);
    if (!profile) return toast.error("No user found");

    try {
      switch (story.initOptions.mode) {
        case "original":
          const response = await get_original_story_chapters({
            story_id: story._id.toString(),
            title: story.title,
            summary: story.summary,
            passage: story.passage,
          });

          if (response) {
            console.log(response.chapterData);
            await reloadStory();
          }
          toast.success("Task created successfully!");
          break;
        case "generated":
          break;
        default:
          break;
      }
    } catch (error: unknown) {
    } finally {
      setGenerateChapterLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden pt-20">
      {/* Background effects */}
      <PaperBackground />

      <div className="container max-w-7xl mx-auto px-4 py-6 md:py-12 relative">
        {/* Story Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button size="sm" variant="outline" onClick={() => navigate(-1)}>
            <ChevronLeft size={25} strokeWidth={1.5} />
            <span>Back</span>
          </Button>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-4xl font-serif font-bold flex items-center gap-2">
                {story?.title}
              </h1>
              {story.initOptions.mode === "original" && (
                <BadgeCheck
                  size={18}
                  strokeWidth={2}
                  className="text-teal-600"
                />
              )}
            </div>
            <Button size="sm">
              <Cog size={20} />
              Manage Story
            </Button>
          </div>
        </motion.div>

        {/* Modified Main Content Grid - Reordered for mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8"
        >
          {/* Left Sidebar (Now appears second on mobile) */}
          <div className="md:col-span-1 order-2 md:order-1">
            <div className="space-y-2 md:space-y-4 md:sticky md:top-4">
              {/* Story Settings Collapsible - More compact */}
              {story && (
                <StorySettingsCollapsible storySettings={story.initOptions} />
              )}
              {/* Characters Collapsible - More compact */}
              {story && (
                <StoryCharacterSection
                  characterDevelopment={story.setup.characterDevelopment}
                />
              )}
              {/* Themes Collapsible - More compact */}
              {story && (
                <StoryThemeSection storyTheme={story.setup.themeWeaver} />
              )}
            </div>
          </div>

          {/* Main Content - Chapters (Now appears first on mobile) */}
          <div className="md:col-span-2 lg:col-span-3 order-1 md:order-2">
            {!story.initialized && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 text-center p-12 shadow-md overflow-hidden border rounded-xl bg-card/50 backdrop-blur-sm relative"
              >
                {/* ~ ======= Decorative illustration */}
                <div className="absolute -bottom-10 right-3 w-32 h-32 opacity-50">
                  <span className="text-xs text-muted-foreground font-semibold absolute top-4 right-6 rotate-12">
                    Quickly?
                  </span>
                  <img
                    src={img1}
                    alt="Decorative story illustration"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="space-y-2 relative">
                  <h2 className="text-2xl font-serif font-semibold">
                    Start Here!
                  </h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Pssst... Wanna see something cool? <br /> Begin your
                    creative journey by setting up your story's foundation.
                    Click the button below.
                  </p>
                </div>

                <div className="grid gap-4 max-w-md mx-auto relative">
                  <Button
                    size="lg"
                    className="w-full relative z-10 hover:shadow-md"
                    onClick={generateChapters}
                  >
                    {generateChapterLoading ? (
                      <>
                        <Loader className="animate-spin mr-2" />
                        <span>Creating chapter setup</span>
                      </>
                    ) : (
                      "Let's Go!"
                    )}
                  </Button>
                </div>
              </motion.div>
            )}

            {story.initialized && (
              <div className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold flex items-center gap-2 text-primary mb-6">
                  <FileText className="h-6 w-6" />
                  Chapters
                </h2>

                {story?.chapters.length === 0 && (
                  <div className="w-full border h-44 flex-col shadow-sm p-4 rounded-lg flex items-center justify-center">
                    <span className="p-2 rounded-full bg-muted">
                      <NotebookTabs size={25} strokeWidth={1.5} />
                    </span>
                    <p className="text-lg">
                      This story has no chapters generated yet.
                    </p>
                    <Button className="mt-3">Generate Chapters</Button>
                  </div>
                )}

                {story.chapters.length > 0 && (
                  <div className="grid gap-4">
                    {story.chapters.map((chapter, index) => (
                      <StoryChapterList
                        key={index}
                        chapter={chapter}
                        reloadStory={reloadStory}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* New Cover Art Section */}
          <div className="md:col-span-1 order-3 hidden lg:block">
            <div className="sticky top-4 space-y-4">
              <h2 className="text-sm font-medium flex items-center gap-1.5 mb-3">
                <ImageIcon className="h-3.5 w-3.5 text-primary/70" />
                Cover Art
              </h2>
              <StoryCoverArt story_art={story.story_art} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SingleStoryPage;

// ~ ======= Story cover art component -->
const StoryCoverArt = ({
  className,
  story_art,
}: {
  story_art: Story["story_art"];
  className?: string;
}) => (
  <div className={cn("relative group", className)}>
    <AspectRatio
      ratio={3 / 4}
      className="overflow-hidden rounded-xl border border-border/40"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20 z-10" />
      <img
        src={story_art.image_url}
        alt="story-art"
        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
      />
    </AspectRatio>
    <Button
      variant="secondary"
      size="sm"
      className="absolute bottom-3 hover:shadow-lg right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity"
    >
      Change Cover
    </Button>
  </div>
);
