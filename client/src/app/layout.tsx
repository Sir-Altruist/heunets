import type { Metadata } from "next";
import { Inter, Calistoga } from "next/font/google"
import "./globals.css";
import { Tools } from "@/utils";
import { CombineProviders, providers } from "@/contexts";


const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const calistoga = Calistoga({ subsets: ["latin"], variable: "--font-serif", weight: ["400"]})
const { cn } = Tools


export const metadata: Metadata = {
  title: "Heunets",
  description: "Login to your account",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.variable, calistoga.variable, "antialiased font-sans")}>
        <CombineProviders contexts={providers}>
          {children}
        </CombineProviders>
      </body>
    </html>
  );
}
