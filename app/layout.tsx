import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { Toaster } from "sonner";
import { CircleCheck, Info, Loader, XCircle } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Toaster
          position="bottom-right"
          icons={{
            success: <CircleCheck className="h-4 w-4  text-green-500" />,
            info: <Info className="h-4 w-4  text-blue-500" />,
            // warning: <ImWarning className="h-4 w-4  text-yellow-500" />,
            error: <XCircle className="h-4 w-4  text-red-500" />,
            loading: (
              <Loader className="h-4 w-4  text-slate-400 animate-spin" />
            ),
          }}
        />
      </body>
    </html>
  );
}
