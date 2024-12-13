import React from "react";
import { Story } from "../../_db.types";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { ChevronDown, Settings } from "lucide-react";

type ComponentProps = {
  storySettings: Story["initOptions"];
};

const StorySettingsCollapsible: React.FC<ComponentProps> = ({
  storySettings,
}) => {
  return (
    <Collapsible
      defaultOpen={false}
      className="space-y-1.5 bg-background/30 rounded-lg p-1.5 md:p-0 md:bg-transparent"
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full py-1.5 px-2 md:px-0 rounded-md hover:bg-background/50 transition-colors">
        <h2 className="text-sm font-medium flex items-center gap-1.5">
          <Settings className="h-3.5 w-3.5 text-primary/70" />
          Story Settings
        </h2>
        <ChevronDown className="h-3 w-3 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2 px-2 md:px-0">
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-background/70 space-y-2 border border-border/50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Genre</span>
              <span className="text-xs px-2 py-1 rounded-full bg-secondary/50 text-secondary-foreground">
                {storySettings?.genre}
              </span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-background/70 space-y-2 border border-border/50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Length</span>
              <span className="text-xs px-2 py-1 rounded-full bg-secondary/50 text-secondary-foreground">
                {storySettings?.length}
              </span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-background/70 space-y-2 border border-border/50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Time Period</span>
              <span className="text-xs px-2 py-1 rounded-full bg-secondary/50 text-secondary-foreground">
                {storySettings?.timePeriod}
              </span>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default StorySettingsCollapsible;
