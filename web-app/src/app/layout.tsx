import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MrSquaare",
  description: "MrSquaare's personal website",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={"en"}>
      <body>{children}</body>
    </html>
  );
}
