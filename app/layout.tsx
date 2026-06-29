import type { Metadata } from "next";
import { Fira_Code, Inter } from "next/font/google";
import "../styles/style.scss";
import styles from "../styles/modules/App.module.scss";

const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "robin rajput | scholarly articles",
  description: "pre-scholarly articles on blockchain, cryptography, and decentralized systems",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${firaCode.variable} ${inter.variable}`}>
        <div className={styles.main}>{children}</div>
      </body>
    </html>
  );
}
