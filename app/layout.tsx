import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kuwait International Airport",
  description: "Official website of Kuwait International Airport",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
