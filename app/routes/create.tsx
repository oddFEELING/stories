"use client";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  ArrowRight,
  BookOpen,
  Loader,
  Notebook,
  Send,
  Sparkles,
  Wand2,
} from "lucide-react";
import { motion } from "framer-motion";
import Img1 from "~/assets/illustrations/humanities/6.png";
import Img3 from "~/assets/illustrations/humanities/3.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { getSuggestionsForStoryTitles } from "~/server/openai-queries";
import { Input } from "~/components/ui/input";
import { Route } from "./+types/create";
import CreateStoryDialog from "~/components/dialogs/create-story-dialog";
import { get_story_suggestions } from "~/actions/openai.action";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Create Your Story" },
    { name: "description", content: "Create your own story with AI" },
    {
      name: "theme-color",
      content: "var(--background)",
    },
  ];
}

// ~ =============================================>
// ~ ======= Define story template interface
// ~ =============================================>"

const CreateStory: React.FC = () => {
  const [stories, setStories] = useState<NewStory[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showCreateStoryDialog, setShowCreateStoryDialog] =
    useState<boolean>(false);
  const [selectedStory, setSelectedStory] = useState<NewStory | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // ~ =============================================>
  // ~ ======= Filter stories based on selected category
  const filteredStories = stories.filter((story) =>
    selectedCategory === "all" ? true : story.category === selectedCategory,
  );

  // ~ =============================================>
  // ~ ======= Framer Motion animation configurations
  // ~ =============================================>"
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // ~ ======= Animate children with 0.1s delay between each
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // ~ ======= Empty State Component with Search
  const EmptyState = () => {
    const [prompt, setPrompt] = useState<string>("");

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="col-span-full flex backdrop-blur-sm flex-col items-center justify-center px-8 py-12 border rounded-xl text-center shadow-lg"
      >
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl" />
          <BookOpen className="w-12 h-12 text-primary relative" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Let's get started</h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          Enter your own story prompt or let us generate some ideas for you
        </p>

        {/* ~ ======= Search input for custom prompt */}
        <div className="flex gap-2 w-full max-w-md mb-4 items-center">
          <Input
            type="text"
            value={prompt}
            disabled={isLoading}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g., A story about courage and friendship..."
            className="px-4 py-2 border-accent rounded-md border "
          />
          <Button
            size="icon"
            className="p-2 flex-1"
            disabled={isLoading}
            onClick={async () => {
              setIsLoading(true);
              // ~ ======= Generate stories based on user prompt or default
              const suggestions = await get_story_suggestions(prompt);
              const parsedSuggestions = JSON.parse(suggestions ?? "[]");
              setStories(parsedSuggestions.response);
              setCategories(parsedSuggestions.categories);
              setIsLoading(false);
            }}
          >
            {isLoading ? (
              <Loader size={14} strokeWidth={1.5} className="animate-spin" />
            ) : (
              <Send size={16} strokeWidth={1} />
            )}
          </Button>
        </div>
      </motion.div>
    );
  };

  return (
    // ~ ======= Main container with enhanced background
    <div className="min-h-screen relative overflow-hidden">
      {/* ~ ======= Enhanced background effects */}
      <div className="absolute inset-0 bg-[url('/paper-texture.jpg')] opacity-30 dark:opacity-0 pointer-events-none" />
      <div className="absolute inset-0">
        {/* Vertical line using shadcn border color */}
        <div className="absolute left-[40px] top-0 bottom-0 w-[2px] bg-border hidden md:block" />

        {/* Horizontal lines with hardcoded colors for light/dark modes */}
        <div
          className="absolute hidden md:block inset-0 opacity-[0.15] dark:opacity-[0.15]"
          style={{
            backgroundImage: `linear-gradient(to bottom, transparent 23px, 
							var(--theme-mode, #475569) 24px)`,
            backgroundSize: "100% 24px",
          }}
        />
      </div>

      {/* ~ ======= Static decorative images with entry animations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none hidden md:block"
      >
        <motion.img
          src={Img1}
          alt=""
          initial={{ opacity: 0, scale: 0.8, x: -100 }}
          animate={{ opacity: 0.7, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="absolute w-48 h-48 left-10 top-20 object-cover rounded-2xl"
        />
        <motion.img
          src={Img3}
          alt=""
          initial={{ opacity: 0, scale: 0.8, x: 100 }}
          animate={{ opacity: 0.7, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="absolute w-56 h-56 right-10 bottom-32 object-cover rounded-2xl"
        />
      </motion.div>

      <div className="container max-w-7xl mx-auto px-4 py-20 relative">
        {/* Header Section */}
        <div className="space-y-6 mb-12">
          <div className="text-center">
            <h1 className="text-4xl font-serif tracking-tight flex items-center justify-center gap-2">
              <Notebook className="h-8 w-8 text-primary/70" />
              Create Your Story
            </h1>
            <p className="text-muted-foreground font-serif">
              Choose a template or let AI guide your creativity
            </p>
          </div>
        </div>

        {/* Main Tabs Container */}
        <Tabs defaultValue="templates" className="space-y-8">
          {/* Tab Navigation with integrated category selector */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
            <TabsList className="w-full max-w-md p-1 backdrop-blur-sm">
              <TabsTrigger value="templates" className="w-full">
                <BookOpen className="mr-2 h-4 w-4" />
                Templates
              </TabsTrigger>
              <TabsTrigger value="ai" className="w-full">
                <Wand2 className="mr-2 h-4 w-4" />
                AI Assistant
              </TabsTrigger>
            </TabsList>

            {/* ~ ======= Repositioned category filter */}
            <div className="w-full sm:w-auto min-w-[200px]">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full bg-background/50 backdrop-blur-sm border-muted hover:bg-background/70 transition-colors">
                  <SelectValue placeholder="Browse by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="cursor-pointer">
                    All
                  </SelectItem>
                  {categories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className="cursor-pointer"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Templates Tab Content */}
          <TabsContent value="templates">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {selectedStory && (
                <CreateStoryDialog
                  open={showCreateStoryDialog}
                  newStory={selectedStory}
                  setOpen={setShowCreateStoryDialog}
                />
              )}
              {filteredStories.length > 0 ? (
                // ~ ======= Existing story cards mapping
                filteredStories.map((story, idx: number) => (
                  <motion.div key={idx} variants={cardVariants}>
                    <Card className="group h-full p-4 hover:shadow-lg transition-all duration-300  bg-background/70 backdrop-blur-sm border-border">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                            {story.category}
                          </span>
                        </div>
                        {/* Story Details */}
                        <div>
                          <h3 className="text-lg font-semibold tracking-tight">
                            {story.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {story.summary}
                          </p>
                          {/* ~ ======= Added passage display */}
                          {story.passage && (
                            <p className="text-xs text-muted-foreground mt-2 italic border-l-2 border-primary/20 pl-2">
                              "{story.passage}"
                            </p>
                          )}
                        </div>
                        {/* Action Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedStory(story);
                            setShowCreateStoryDialog(true);
                          }}
                          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        >
                          Use Template
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <EmptyState />
              )}
            </motion.div>

            {/* ~ ======= Show Load More button only when there are stories */}
            {filteredStories.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-center"
              >
                <Button
                  variant="outline"
                  className="bg-background/50 backdrop-blur-sm"
                  onClick={async () => {
                    // ~ ======= Add your load more logic here
                    const data = await getSuggestionsForStoryTitles(
                      "A story about a hero's journey",
                    );
                    console.log(JSON.parse(data ?? ""));
                  }}
                >
                  Load More Templates
                </Button>
              </motion.div>
            )}
          </TabsContent>

          {/* AI Assistant Tab Content */}
          <TabsContent value="ai">
            <Card className="max-w-2xl mx-auto bg-background/70 backdrop-blur-sm border-border">
              <div className="p-8 space-y-6">
                {/* AI Assistant Header */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold tracking-tight">
                    AI Story Assistant
                  </h3>
                  <p className="text-muted-foreground">
                    Let our AI guide you through creating a unique and
                    compelling story structure
                  </p>
                </div>
                {/* AI Features List */}
                <div className="bg-secondary/50 rounded-lg p-4">
                  <p className="text-sm text-secondary-foreground">
                    The AI will help you develop:
                    <span className="block mt-2">
                      • Character arcs and development
                    </span>
                    <span className="block">• Plot structure and pacing</span>
                    <span className="block">• Theme exploration</span>
                  </p>
                </div>
                {/* AI Start Button */}
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90"
                  onClick={() => {}}
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Begin AI-Assisted Creation
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreateStory;
