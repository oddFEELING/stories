"use client";
import React, { useState } from "react";
import { Story } from "../../_db.types";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  AudioLines,
  ChevronRight,
  EllipsisVertical,
  MicVocal,
  Rss,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import useNowReading from "~/hooks/use-now-reading";
import StoryGenerateChapterContentDialog from "~/components/dialogs/story-generate-chapter-content-dialog";

type ComponentProps = {
  chapter: Story["chapters"][0];
  reloadStory: RefetchFunctionType;
};

const StoryChapterList: React.FC<ComponentProps> = ({
  chapter,
  reloadStory,
}) => {
  const { setShowNowReading, setCurrentChapter, setCurrentSeek, setIsPlaying } =
    useNowReading();
  const [showCreateContent, setShowCreateContent] = useState<boolean>(false);

  return (
    <Card className="bg-background/70 hover:bg-background hover:border-primary transition-colors backdrop-blur-sm border-border group cursor-pointer">
      <CardHeader className="p-4 md:p-6 gap-1">
        <CardTitle className="flex justify-between items-center transition-colors text-base md:text-lg">
          <span>
            {chapter.chapter_number}. {chapter.title}
          </span>
          <div className="w-max flex items-center gap-3">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setCurrentChapter(chapter);

                if (chapter.content.raw) {
                  setShowNowReading(true);
                  setCurrentSeek(0);
                  setIsPlaying(true);
                } else setShowCreateContent(true);
              }}
            >
              <AudioLines size={18} strokeWidth={1.2} /> Play
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <EllipsisVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Chapter Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Rss size={16} strokeWidth={1.2} /> Make Public
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MicVocal size={16} strokeWidth={1.2} />
                    Change voice
                    <DropdownMenuShortcut>
                      <ChevronRight />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardTitle>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          {chapter.tagline}
        </p>
        <p className="text-xs md:text-sm -mt-1">{chapter.setup.synopsis}</p>
      </CardHeader>
      <StoryGenerateChapterContentDialog
        chapter={chapter}
        open={showCreateContent}
        setOpen={setShowCreateContent}
        reloadChapter={reloadStory}
      />
    </Card>
  );
};

export default StoryChapterList;
