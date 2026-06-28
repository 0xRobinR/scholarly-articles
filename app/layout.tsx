import type { Metadata } from "next";
import { Fira_Code, JetBrains_Mono, Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "../styles/style.scss";
import ClientShell from "./ClientShell";

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "robin rajput | coding the endgame",
  description: "core builder — scholarly articles on blockchain, cryptography, and decentralized systems",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className="theme-terminal">
      <body className={`${firaCode.variable} ${jetbrainsMono.variable} ${inter.variable}`}>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
