"use client";
import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Button } from "~/components/ui/button";
import { CSS } from "@dnd-kit/utilities";

type ComponentProps = {
  children: React.ReactNode;
};

const NowReadingDraggable: React.FC<ComponentProps> = ({ children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "now-reading-draggable",
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
      <Button className="absolute  top-44 z-50">Now Playing</Button>
    </div>
  );
};

export default NowReadingDraggable;
