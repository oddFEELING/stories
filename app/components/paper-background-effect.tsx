import React from "react";

type ComponentProps = {};

const PaperBackground: React.FC<ComponentProps> = ({}) => {
  return (
    <React.Fragment>
      <div className="absolute inset-0 bg-[url('/paper-texture.jpg')] opacity-30 dark:opacity-0 pointer-events-none" />
      <div className="absolute inset-0">
        <div className="absolute left-[40px] top-0 bottom-0 w-[2px] bg-border hidden lg:block" />
        <div
          className="absolute hidden lg:block inset-0 opacity-[0.15] dark:opacity-[0.15]"
          style={{
            backgroundImage: `linear-gradient(to bottom, transparent 23px, var(--theme-mode, #475569) 24px)`,
            backgroundSize: "100% 24px",
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default PaperBackground;
