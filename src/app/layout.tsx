import "../app/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import Navbar from "@/Components/Navbar";
import { ReactNode } from "react";
import { Toaster } from "@/Components/ui/toaster";
import { FormDataContextProvider } from "@/Context/FormDataContextProvider";
import Provider from "@/Context/ClientSessionProvider";

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
        <Provider>

        {/* <div className="container"> */}
        {/* <div className="wrapper"> */}
        <FormDataContextProvider>
          <Navbar />
          {children}
          <Toaster />
        </FormDataContextProvider>
        {/* </div> */}
        {/* </div> */}
        </Provider>
      </body>
    </html>
  );
}
