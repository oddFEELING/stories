"use client";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { ChevronDown, Trees } from "lucide-react";
import { Story } from "../../_db.types";

type ComponentProps = {
  storyTheme: Story["setup"]["themeWeaver"];
};

const StoryThemesSection: React.FC<ComponentProps> = ({ storyTheme }) => {
  return (
    <Collapsible
      defaultOpen={false}
      className="space-y-1.5 bg-background/30 rounded-lg p-1.5 md:p-0 md:bg-transparent"
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full py-1.5 px-2 md:px-0 rounded-md hover:bg-background/50 transition-colors">
        <h2 className="text-sm font-medium flex items-center gap-1.5">
          <Trees className="h-3.5 w-3.5 text-primary/70" />
          Themes
        </h2>
        <ChevronDown className="h-3 w-3 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>

      <CollapsibleContent className="px-2 md:px-0 space-y-2">
        <div className="bg-primary/5 p-2 rounded-lg space-y-1">
          <p className="text-sm font-medium text-muted-foreground">
            {storyTheme.central_theme.theme || "No theme generated yet"}
          </p>
          <p className="text-xs text-muted-foreground">
            {storyTheme.central_theme.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {storyTheme.supporting_themes?.map((theme, index) => (
            <div
              key={index}
              className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs hover:bg-primary/20 transition-colors"
            >
              {theme}
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default StoryThemesSection;
