import React from "react";
import { Outlet } from "react-router";
import { ThemeProvider } from "~/components/layouts/theme-provider";
import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "~/components/ui/sonner";
import NowReadingSheet from "~/components/sheets/now-reading-sheet";

type ComponentProps = {};
export const queryClient = new QueryClient();

const AppLayout: React.FC<ComponentProps> = ({}) => {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!PUBLISHABLE_KEY) {
    throw new Error("Publishable key for clerk is missing!");
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
          <Outlet />
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
          <NowReadingSheet />
        </ClerkProvider>
        {/*<ScreenSize />*/}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default AppLayout;
