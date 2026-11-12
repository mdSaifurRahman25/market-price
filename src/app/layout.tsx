import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Header from "@/components/layoutcomponent/Header";
import Footer from "@/components/layoutcomponent/Footer";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "বাজার দর | BazarDor",
  description: "নিত্যপ্রয়োজনীয় পণ্যের প্রতিদিনের বাজার দর এক নজরে",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${notoSerifBengali.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden bg-[#f8faf9]">
        <Toaster position="top-right" />
        <Header />
        <main className="flex-1 w-full min-w-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
