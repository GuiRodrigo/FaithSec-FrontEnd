import { ThemeProvider } from "@/components/theme-provider";
import { AppProvider } from "@/hooks";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={cn("min-h-screen bg-middleground font-sans antialiased")}>
      <AppProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <Component {...pageProps} />
          </TooltipProvider>
        </ThemeProvider>
      </AppProvider>
    </div>
  );
}
