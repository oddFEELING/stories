import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { ChevronDown, ChevronRight, PersonStanding, Users } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Story } from "../../_db.types";

type ComponentProps = {
  characterDevelopment: Story["setup"]["characterDevelopment"];
};

const StoryCharacterSection: React.FC<ComponentProps> = ({
  characterDevelopment,
}) => {
  return (
    <Collapsible
      defaultOpen={false}
      className="space-y-1.5 bg-background/30 rounded-lg p-1.5 md:p-0 md:bg-transparent"
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full py-1.5 px-2 md:px-0 rounded-md hover:bg-background/50 transition-colors">
        <h2 className="text-sm font-medium flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5 text-primary/70" />
          Characters
        </h2>
        <ChevronDown className="h-3 w-3 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>

      {/* ####################################### */}
      {/* -- Main content */}
      {/* ####################################### */}
      <CollapsibleContent className="space-y-2 px-2 md:px-0">
        {/* ~ ####### control section ####### */}
        {/* ~ ####### todo: implement character view later ####### */}
        {/*<div className="flex justify-end gap-3">*/}
        {/*  <Button variant="outline" size="sm">*/}
        {/*    View all*/}
        {/*  </Button>*/}
        {/*  <Button variant="ghost" size="sm">*/}
        {/*    <Plus className="h-4 w-4" />*/}
        {/*  </Button>*/}
        {/*</div>*/}

        {/* ~ ####### empty state ####### */}
        {characterDevelopment.character_profiles.length === 0 && (
          <div className="w-full border rounded-md flex flex-col items-center justify-center p-4">
            <span className="rounded-full bg-muted p-1.5">
              <PersonStanding size={18} strokeWidth={1.5} />
            </span>
            <p className="text-muted-foreground text-xs text-center w-3/4">
              This Story has no characters yet.
            </p>
          </div>
        )}

        {/* ~ ####### main content ####### */}
        {characterDevelopment.character_profiles.length > 0 && (
          <div className="space-y-3">
            {characterDevelopment.character_profiles.map((character, index) => (
              <div
                key={index}
                className="group cursor-pointer relative p-3 rounded-lg bg-background/70 hover:bg-background/90 transition-all duration-300 border border-border/40 hover:border-primary/30"
              >
                {/* Main character info with simplified layout */}
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold tracking-tight">
                      {character.new_name}
                    </h3>
                    <span className="text-xs text-muted-foreground/80">
                      as {character.biblical_role.original_name}
                    </span>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 transform relative -mr-1.5 group-hover:translate-x-0.5 transition-transform duration-300"
                  >
                    <ChevronRight className="h-4 w-4 text-primary/60" />
                  </Button>
                </div>

                {/* Single primary motivation tag */}
                <div className="mt-2">
                  <span className="text-xs px-2 py-0.5 rounded-md font-medium bg-primary/10 text-primary-foreground/90">
                    {character.core_traits.motivations[0]}
                  </span>
                </div>

                {/* Subtle hover effect */}
                <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        )}

        {/* ~ ####### stats ####### */}
        <div className="pt-4 border-t border-border/50">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex flex-col items-center p-2 rounded-lg bg-secondary/20">
              <span className="text-xs text-muted-foreground">Main</span>
              <span className="font-medium">
                {characterDevelopment.character_profiles.length}
              </span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-lg bg-secondary/20">
              <span className="text-xs text-muted-foreground">Supporting</span>
              <span className="font-medium">
                {characterDevelopment.character_arcs.supporting_casts.length}
              </span>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default StoryCharacterSection;
