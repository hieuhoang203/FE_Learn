import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme.provider";
import { DarkModeToggle } from "@/components/common/DarkModeToggle";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TL Study",
  description: "Create by Hoang Van Hieu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.variable} ${robotoMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DarkModeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}