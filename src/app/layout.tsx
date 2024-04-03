import "../app/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import Navbar from "@/Components/Navbar";
import { ReactNode } from "react";
import { Toaster } from "@/Components/ui/toaster";

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
        {/* <div className="container"> */}
        {/* <div className="wrapper"> */}
            <Navbar />
            {children}
          {/* </div> */}
        {/* </div> */}
      </body>
    </html>
  );
}
