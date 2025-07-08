import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Feedback Board",
  description:
    "Collect, organize, and act on user feedback effortlessly. Our intuitive feedback board helps you build better products by understanding what your users truly want.",
  appleWebApp: {
    title: "Feedback Board",
  },
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
        <NextTopLoader color="#8e51ff" showSpinner={false} />
        {children}
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}

