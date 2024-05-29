import "../app/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import Navbar from "@/Components/Navbar";
import { ReactNode } from "react";
import { Toaster } from "@/Components/ui/toaster";
import { FormDataContextProvider } from "@/Context/FormDataContextProvider";
import Provider from "@/Context/ClientSessionProvider";
import { ThemeProvider } from "@/Components/theme-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
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
              {children}
              <Toaster />
            </FormDataContextProvider>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
