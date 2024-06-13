import { Poppins as FontSans } from "next/font/google";
import "../app/globals.css";

import Navbar from "@/Components/Navbar";
import { ThemeProvider } from "@/Components/theme-provider";
import { Toaster } from "@/Components/ui/toaster";
import Provider from "@/Context/ClientSessionProvider";
import { FormDataContextProvider } from "@/Context/FormDataContextProvider";
import { cn } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["500"],
});

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Provider>
            <FormDataContextProvider>
              <Navbar />
              <SpeedInsights/>
              {children}
              <Toaster />
            </FormDataContextProvider>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
