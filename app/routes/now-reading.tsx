import React from "react";
import { Button } from "~/components/ui/button";
import { ChevronLeft } from "lucide-react";
import NowReadingSheet from "~/components/sheets/now-reading-sheet";

type ComponentProps = {};

const NowReading: React.FC<ComponentProps> = ({}) => {
  return (
    <div className="w-full h-svh justify-between">
      {/* ####################################### */}
      {/* -- top bar */}
      {/* ####################################### */}
      <header className="w-full bg-rose-50 h-14 flex items-center justify-between py-2 px-4">
        <Button variant="ghost" size="icon">
          <ChevronLeft />
        </Button>

        <p>Now Reading</p>

        <Button>Hello</Button>
      </header>

      <main>
        {/* ####################################### */}
        {/* -- spotlight */}
        {/* ####################################### */}
        <section>
          <NowReadingSheet />
        </section>
        {/* ####################################### */}
        {/* -- control section */}
        {/* ####################################### */}
        <section></section>
      </main>
    </div>
  );
};

export default NowReading;
