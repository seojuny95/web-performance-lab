import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Still One | Web Performance Lab",
  description: "An intentionally slow product page for web performance experiments",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
