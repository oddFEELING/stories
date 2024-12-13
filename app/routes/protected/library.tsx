"use client";
import React, { useEffect, useState } from "react";
import { ChevronRight, Library, Loader, Search, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { motion } from "framer-motion";
import { Card } from "~/components/ui/card";
import Img1 from "~/assets/illustrations/humanities/19.png";
import Img3 from "~/assets/illustrations/humanities/10.png";
import moment from "moment";
import { Input } from "~/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import useProfile from "~/hooks/use-profile";
import { get_user_stories } from "~/actions/story.action";
import { Story } from "../../../_db.types";
import PaperBackground from "~/components/paper-background-effect";
import { useNavigate } from "react-router";

// ~ ======= Add random position utility
const getRandomPosition = () => ({
  top: `${Math.random() * 70 + 10}%`,
  left: `${Math.random() * 70 + 10}%`,
  transform: `rotate(${Math.random() * 20 - 10}deg)`,
});

// ~ =============================================>
// ~ ======= Component for empty search state
// ~ ==============================================>
const EmptyState: React.FC<{ searchQuery: string }> = ({ searchQuery }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-12 px-4"
  >
    <div className="max-w-md mx-auto space-y-4">
      <Search className="h-12 w-12 mx-auto text-muted-foreground/50" />
      <h3 className="text-lg font-semibold">No stories found</h3>
      <p className="text-muted-foreground">
        No stories matching "{searchQuery}" were found. Try adjusting your
        search terms.
      </p>
    </div>
  </motion.div>
);

// ~ =============================================>
// ~ ======= Main Library Component
// ~ ======= Displays a collection of user stories with search and filtering
// ~ ==============================================>

const MyLibrary: React.FC = () => {
  const { profile } = useProfile();
  const navigate = useNavigate();
  const { data: stories, isLoading } = useQuery({
    queryKey: ["Get user stories", profile?._id],
    queryFn: async () => await get_user_stories(profile?._id as string),
  });
  // ~ ======= Add search state
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStories, setFilteredStories] = useState<Story[]>([]);
  const [groupedStories, setGroupedStories] = useState<Record<string, Story[]>>(
    {},
  );

  // ~ ======= Generate random positions for images
  const [imagePositions] = useState([
    getRandomPosition(),
    getRandomPosition(),
    getRandomPosition(),
  ]);

  // ~ =============================================>
  // ~ ======= Animation Variants
  // ~ ======= Defines animation states for container and cards
  // ~ ==============================================>
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // ~ ======= Filter and sort stories
  useEffect(() => {
    if (stories) {
      const filt = stories
        .filter((story) =>
          story.title.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      setFilteredStories(filt);
    }
  }, [searchQuery, stories]);

  // ~ =============================================>
  // ~ ======= Story Management
  // ~ ======= Handles filtering, sorting, and grouping of stories
  // ~ ==============================================>

  useEffect(() => {
    const gs = filteredStories.reduce(
      (groups, story) => {
        const date = moment(story.createdAt).format("YYYY-MM-DD");
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(story);
        return groups;
      },
      {} as Record<string, Story[]>,
    );

    setGroupedStories(gs);
  }, [filteredStories]);

  // ~ =============================================>
  // ~ ======= Date Formatting
  // ~ ======= Utility functions for date display and grouping
  // ~ ==============================================>

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

  if (!isLoading && !stories) {
    return <p>No stories</p>;
  }

  const getDateDisplay = (date: string) => {
    const momentDate = moment(date);
    const today = moment().startOf("day");
    const yesterday = moment().subtract(1, "days").startOf("day");

    if (momentDate.isSame(today, "day")) {
      return "Today";
    } else if (momentDate.isSame(yesterday, "day")) {
      return "Yesterday";
    }
    return momentDate.format("MMMM D, YYYY");
  };

  // ~ =============================================>
  // ~ ======= UI Layout
  // ~ ======= Main component structure with background effects and decorative elements
  // ~ ==============================================>
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* ~ ======= Background effects */}
      <PaperBackground />

      {/* ~ ======= Updated decorative images with random positions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 pointer-events-none hidden md:block"
      >
        <motion.img
          src={Img1}
          alt=""
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute w-32 h-32 object-cover rounded-2xl"
          style={imagePositions[0]}
        />
        <motion.img
          src={Img3}
          alt=""
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute w-40 h-40 object-cover rounded-2xl"
          style={imagePositions[1]}
        />
      </motion.div>

      <div className="container max-w-7xl mx-auto px-4 py-20 relative">
        {/* ~ ======= Header Section */}
        <div className="space-y-6 mb-12">
          <div className="text-center">
            <h1 className="text-4xl font-serif tracking-tight flex items-center justify-center gap-2">
              <Library className="h-8 w-8 text-primary/70" />
              My Library
            </h1>
            <p className="text-muted-foreground font-serif">
              Your personal collection of stories
            </p>
          </div>
        </div>

        {/* ~ ======= Add search input */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border border-muted"
            />
          </div>
        </div>

        {/* ~ ======= Conditional rendering for stories or empty state */}
        {filteredStories.length > 0 ? (
          <div className="space-y-8">
            {/* ~ ======= Stories sections by date */}
            {Object.entries(groupedStories).map(([date, stories]) => (
              <div key={date}>
                {/* ~ ======= Updated date header */}
                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-sm text-muted-foreground">
                      {getDateDisplay(date)}
                    </span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                </div>

                {/* ~ ======= Stories Grid */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                  {stories.map((story) => (
                    <motion.div
                      key={story._id.toString()}
                      variants={cardVariants}
                    >
                      <Card className="group h-full overflow-hidden hover:border-primary cursor-pointer bg-background/70 backdrop-blur-sm border-border hover:shadow-lg transition-all duration-300">
                        <div className="relative h-44">
                          <img
                            src={story.story_art.image_url}
                            alt={story.title}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="p-3 space-y-2">
                          <h2 className="text-base font-semibold tracking-tight line-clamp-1">
                            {story.title}
                          </h2>
                          {/* ~ ======= Updated timestamp display */}
                          <p className="text-xs text-muted-foreground line-clamp-2 my-1 text-wrap text-ellipsis">
                            {story.summary}
                          </p>

                          <div className="flex justify-between items-center pt-1">
                            <span
                              className={`text-xs font-medium px-2 py-0.5 rounded-md ${
                                story.public
                                  ? "bg-amber-500/10 text-amber-500"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {story.public ? "Public" : "Private"}
                            </span>
                            <div className="flex gap-1 items-center">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="hover:bg-rose-600"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() =>
                                  navigate(`/stories/${story._id}`)
                                }
                              >
                                View
                                <ChevronRight size={16} strokeWidth={1.2} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState searchQuery={searchQuery} />
        )}
      </div>
    </div>
  );
};

export default MyLibrary;
