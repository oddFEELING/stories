import React, { useEffect, useRef, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import {
  Bookmark,
  ChevronDown,
  ChevronRight,
  EllipsisVertical,
  Flag,
  ImageDown,
  LetterText,
  Moon,
  Pause,
  Play,
  Redo,
  SkipBack,
  SkipForward,
  Sun,
  ThumbsDown,
  ThumbsUp,
  User,
  Volume2,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Slider } from "~/components/ui/slider";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { motion } from "framer-motion";
import { useTheme } from "~/components/layouts/theme-provider";
import useNowReading from "~/hooks/use-now-reading";
import { ScrollArea } from "~/components/ui/scroll-area";

type ComponentProps = {};

// ~ ======= Animation variants for slide transitions with spring effect
const slideVariants = {
  coverEnter: {
    x: [-100, 0],
    opacity: [0, 1],
  },
  coverExit: {
    x: [0, 100],
    opacity: [1, 0],
  },
  contentEnter: {
    x: [100, 0],
    opacity: [0, 1],
  },
  contentExit: {
    x: [0, -100],
    opacity: [1, 0],
  },
};

// ~ =============================================>
// ~ ======= cover tab  -->
// ~ =============================================>
const CoverTab = () => {
  const { currentStory } = useNowReading();
  return (
    <motion.div
      initial="coverEnter"
      animate={{ x: 0, opacity: 1 }}
      exit="coverExit"
      variants={slideVariants}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="flex flex-col items-center justify-center h-full p-10 w-full max-w-lg mx-auto"
    >
      <div className="w-full">
        <AspectRatio
          ratio={1}
          className="border rounded-xl shadow-xl overflow-hidden"
        >
          <img
            src={
              currentStory?.story_art?.image_url ||
              "https://images.unsplash.com/photo-1733036016861-0541eb76dac5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8"
            }
            alt="cover-img"
            className="absolute object-cover object-center"
          />
        </AspectRatio>
      </div>
    </motion.div>
  );
};

// ~ =============================================>
// ~ ======= content tab  -->
// ~ =============================================>
const ContentTab = ({ chapterContent }: { chapterContent: string }) => (
  <motion.div
    initial="contentEnter"
    animate={{ x: 0, opacity: 1 }}
    exit="contentExit"
    variants={slideVariants}
    transition={{ type: "spring", stiffness: 400, damping: 20 }}
    className="h-full p-4 overflow-y-auto"
  >
    <div className="max-w-2xl h-full mx-auto space-y-4">
      <ScrollArea className="h-full w-full">
        <div className="rounded-lg bg-muted h-full p-6 shadow-sm">
          <p className="text-muted-foreground pb-3 border-b border-muted-foreground">
            Chapter Content
          </p>
          <p>{chapterContent}</p>
        </div>
      </ScrollArea>
    </div>
  </motion.div>
);

// ~ =============================================>
// ~ ======= main component  -->
// ~ =============================================>

const NowReadingSheet: React.FC<ComponentProps> = ({}) => {
  const { theme, toggleTheme } = useTheme();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState<number>(100);

  const {
    showNowReading,
    setShowNowReading,
    isPlaying,
    setIsPlaying,
    currentStory,
    currentTab,
    currentSeek,
    setCurrentSeek,
    currentChapter,
    setCurrentTab,
    volumeLevel,
    setVolumeLevel,
  } = useNowReading();
  const [open, setOpen] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");

  // ~ ======= toggle play/ pause -->
  const togglePlayPause = () => {
    if (audioRef.current) {
      setIsPlaying(!isPlaying);
    }
  };

  // ~ ======= handle time update -->
  const handleTimeUpdate = () => {
    audioRef.current && setCurrentSeek(audioRef.current.currentTime);
  };

  // ~ ======= loading metaData -->
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // ~ ======= handle seek  -->
  const handleSeek = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentSeek(value);
    }
  };

  // ~ ======= handle volume change  -->
  useEffect(() => {
    if (volumeLevel && audioRef.current) {
      audioRef.current.volume = parseFloat(volumeLevel.toString());
    }
  }, [volumeLevel]);

  // ~ ======= effect to sync play state when user seeks  -->
  useEffect(() => {
    setIsPlaying(false);
    setShowNowReading(false);
    audioRef.current &&
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));

    // ~ ======= cleanup -->
    return () => {
      audioRef.current &&
        audioRef.current.removeEventListener("ended", () =>
          setIsPlaying(false),
        );
    };
  }, []);

  useEffect(() => {
    currentChapter && setContent(currentChapter?.content?.raw || "");
  }, [currentChapter]);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <Sheet open={showNowReading} onOpenChange={setShowNowReading}>
      <SheetTrigger asChild>
        {/* ~ ####### Audio element ####### */}
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          src={currentChapter?.audio_url || ""}
        />
      </SheetTrigger>
      <SheetContent
        showClose={false}
        side="bottom"
        className="h-[99svh] rounded-t-2xl p-0 overflow-hidden"
        onPointerDown={(e) => {
          const start = e.clientY;

          const handlePointerMove = (moveEvent: PointerEvent) => {
            const end = moveEvent.clientY;
            const difference = end - start;

            if (difference > 350 && difference > 0) {
              setShowNowReading(false);
              document.removeEventListener("pointermove", handlePointerMove);
            }
          };

          document.addEventListener("pointermove", handlePointerMove);

          const handlePointerUp = () => {
            document.removeEventListener("pointermove", handlePointerMove);
            document.removeEventListener("pointerup", handlePointerUp);
          };

          document.addEventListener("pointerup", handlePointerUp);
        }}
      >
        <Tabs
          defaultValue="cover"
          value={currentTab}
          onValueChange={(value) => setCurrentTab(value as "cover" | "content")}
          className="h-full flex flex-col"
        >
          <SheetHeader className="border-b p-4 md:px-10">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SheetClose asChild>
                  <Button variant="ghost" size="icon">
                    <ChevronDown strokeWidth={1.5} />
                  </Button>
                </SheetClose>
                <SheetTitle className="hidden sm:block underline-none border-0 h-max m-0 p-0">
                  Now Reading
                </SheetTitle>
              </div>

              <TabsList>
                <TabsTrigger value="cover">Cover</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
              </TabsList>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="outline">
                    <EllipsisVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User /> View owner
                      <DropdownMenuShortcut>
                        <ChevronRight size={18} />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Redo /> View
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bookmark /> Save Story
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ImageDown /> Download cover
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LetterText /> Open reader
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Flag /> Report
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SheetHeader>

          <main className="flex-1 overflow-hidden">
            <TabsContent value="cover" className="h-full m-0">
              <CoverTab />
            </TabsContent>
            <TabsContent value="content" className="h-full m-0">
              <ContentTab chapterContent={content} />
            </TabsContent>
          </main>

          <SheetFooter className="border-t">
            <div className="py-3 px-4 flex flex-col max-w-2xl mx-auto w-full gap-2">
              <h3 className="text-left">{currentStory?.title}</h3>
              <p className="-mt-2 text-muted-foreground">
                Chapter {currentChapter?.chapter_number}.{" "}
                {currentChapter?.title}
              </p>

              <div className="w-full py-2 flex items-center space-x-1">
                <Button size="icon" variant="ghost" className="">
                  <ThumbsUp size={20} strokeWidth={1.5} />
                </Button>
                <Button size="icon" variant="ghost" className="">
                  <ThumbsDown size={20} strokeWidth={1.5} />
                </Button>
              </div>

              {/* ~ ####### seek progress ####### */}
              <div className="w-full flex flex-col">
                <Slider
                  defaultValue={[0]}
                  max={duration}
                  value={[currentSeek]}
                  onValueChange={(value) => handleSeek(value[0])}
                  step={0.1}
                  className="bg-muted h-max"
                />
                <div className="w-full mt-2 text-muted-foreground  text-sm flex items-center justify-between">
                  <span>
                    {new Date(Math.round(currentSeek) * 1000)
                      .toISOString()
                      .slice(14, 19)}
                  </span>

                  <span>
                    {new Date(duration * 1000).toISOString().slice(14, 19)}
                  </span>
                </div>
              </div>

              {/* ~ ####### Play/Pause ####### */}
              <div className="flex w-full justify-between items-center mb-4 mt-3">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    A-
                  </Button>
                  <Button variant="ghost" size="sm">
                    A+
                  </Button>
                </div>
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="icon">
                    <SkipBack className="h-4 w-4" />
                    <span className="sr-only">Previous Chapter</span>
                  </Button>
                  <Button
                    variant="default"
                    size="icon"
                    className="h-12 w-12"
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? (
                      <Pause className="h-6 w-6" />
                    ) : (
                      <Play className="h-6 w-6" />
                    )}
                    <span className="sr-only">
                      {isPlaying ? "Pause" : "Play"}
                    </span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <SkipForward className="h-4 w-4" />
                    <span className="sr-only">Next Chapter</span>
                  </Button>
                </div>
                <div className="flex items-center gap-1">
                  <Volume2
                    className="h-4 w-4 cursor-pointer"
                    onClick={() => {
                      if (volumeLevel) {
                        volumeLevel > 0 ? setVolumeLevel(0) : setVolumeLevel(1);
                      }
                    }}
                  />
                  <Slider
                    className="w-[100px] bg-muted"
                    defaultValue={[volumeLevel]}
                    value={[volumeLevel]}
                    onValueChange={(value) => setVolumeLevel(value[0])}
                    max={1}
                    min-={0}
                    step={0.01}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Button size="sm" variant="ghost" onClick={toggleTheme}>
                  {theme === "dark" ? (
                    <>
                      <Moon className="h-4 w-4" />
                      <span>Dark mode</span>
                    </>
                  ) : (
                    <>
                      <Sun className="h-4 w-4" />
                      <span>Light mode</span>
                    </>
                  )}
                </Button>

                <Button variant="outline" size="sm">
                  Next Chapter
                </Button>
              </div>

              <div className="w-full flex items-center justify-between"></div>
            </div>
          </SheetFooter>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default NowReadingSheet;
