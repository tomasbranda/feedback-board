import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Feedback Board",
  description:
    "Collect, organize, and act on user feedback effortlessly. Our intuitive feedback board helps you build better products by understanding what your users truly want.",
};

const mulish = Mulish({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${mulish.className} bg-stone-100 p-4 md:p-8`}>
        {children}
      </body>
    </html>
  );
}

