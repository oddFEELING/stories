"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { ScrollArea } from "~/components/ui/scroll-area";
import { AudioLines, BookOpen, Loader } from "lucide-react";
import useNowReading from "~/hooks/use-now-reading";
import { Story } from "../../../_db.types";
import OpenAI from "openai";
import { toast } from "sonner";
import { AssistantStream } from "openai/lib/AssistantStream.mjs";
import { add_story_chapter_content } from "~/actions/story.action";
import useProfile from "~/hooks/use-profile";

type ComponentProps = {
  open: boolean;
  chapter: Story["chapters"][0];
  reloadChapter: RefetchFunctionType;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// ~ =============================================>
// ~ ======= main component  -->
// ~ =============================================>
const StoryGenerateChapterContentDialog: React.FC<ComponentProps> = ({
  open,
  setOpen,
  chapter,
  reloadChapter,
}) => {
  const { profile } = useProfile();
  const {
    setShowNowReading,
    currentStory,
    setCurrentChapter,
    setCurrentSeek,
    setIsPlaying,
  } = useNowReading();
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<"generating" | "finishing" | "done">(
    "generating",
  );
  const [cancelled, setCancelled] = useState<boolean>(false);
  const [currentRun, setCurrentRun] = useState<AssistantStream | null>(null);

  // ~ ======= ref for scroll container -->
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // ~ ======= auto scroll effect -->
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [content]); // Scroll whenever content updates

  // ~ ======= get content stream -->
  const getContentStream = useCallback(async () => {
    setContent("");
    const openai = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    setContent("Warming up...");
    console.log("currentStory", currentStory);
    console.log("chapter", chapter);

    // ~ ======= create thread -->
    const thread = await openai.beta.threads.create({
      messages: [
        {
          role: "user",
          content: `
        you have the context for the bible story:
        ${JSON.stringify(currentStory)}
        and the chapter settings are given in the chapter setup as:
        ${JSON.stringify(chapter)}
         `,
        },
      ],
    });

    // ~ ======= clear content before streaming -->
    setContent("");
    const run = openai.beta.threads.runs.stream(thread.id, {
      model: "gpt-4o-mini",
      assistant_id: import.meta.env.VITE_ORIGINAL_STORY_TELLER as string,
    });
    setCurrentRun(run);
    run
      .on("textDelta", (textDelta, snapshot) => {
        setContent((state) => state + textDelta.value);
      })
      .on("messageDone", async (message) => {
        setLoading("finishing");
        console.log("story creation done");
        setCurrentRun(null);

        const response = await add_story_chapter_content(
          currentStory!._id!.toString(),
          chapter.chapter_number,
          message.content[0].text.value,
          profile!._id as string,
        );

        if (response?.success) {
          await reloadChapter();
          setCurrentSeek(0);
          setIsPlaying(true);
          setCurrentChapter(chapter);
          setOpen(false);
          setShowNowReading(true);
        }
      })
      .on("abort", () => {
        setCurrentRun(null);
        toast.error("Story generation cancelled");
      });
  }, []);

  useEffect(() => {
    if (open && !chapter.content.raw && !currentRun && profile)
      getContentStream();
    if (!open) {
      setCancelled(false);
      setLoading("generating");
    }
  }, [open, chapter]);

  // ~ ======= handle listen -->
  const handleListen = () => {
    // Placeholder function for listen action
    console.log("Listen to chapter");
    setOpen(false);
    setShowNowReading(true);
    // Here you would typically start an audio playback or navigate to an audio player
  };

  // ~ ======= handle cancel  -->
  const handleCancel = () => {
    setCancelled(true);
    currentRun?.abort();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="no-underline border-none p-0 m-0">
            First time? No worries
          </DialogTitle>
          <DialogDescription>
            Seems like a new chapter. <br />I will generate the content for you.
            This happens only once. Well... Except you cancel it of course.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea
          className="h-[300px] w-full rounded-md border mt-2 p-4"
          ref={scrollRef}
        >
          <div className="text-sm whitespace-pre-wrap">{content}</div>
        </ScrollArea>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
          <BookOpen size={14} />
          <span>
            {content.split(/\s+/).filter((word) => word.length > 0).length}{" "}
            words
          </span>
        </div>

        <div className="flex justify-end mt-4 gap-5">
          <Button onClick={handleCancel} variant="outline" className="w-max">
            Cancel
          </Button>
          {!cancelled && (
            <Button
              disabled={loading !== "done"}
              onClick={handleListen}
              className="w-max"
            >
              {
                {
                  generating: (
                    <>
                      <Loader
                        size={16}
                        strokeWidth={1.5}
                        className="animate-spin"
                      />
                      <span>Writing your story...</span>
                    </>
                  ),
                  finishing: (
                    <>
                      <Loader
                        size={16}
                        strokeWidth={1.5}
                        className="animate-spin"
                      />
                      <span>Rehearsing story narration...</span>
                    </>
                  ),
                  done: (
                    <>
                      <AudioLines
                        size={16}
                        strokeWidth={1.5}
                        className="animate-spin"
                      />
                      <span>Listen now</span>
                    </>
                  ),
                }[loading]
              }
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoryGenerateChapterContentDialog;
