import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClientLayout from "./ClientLayout"; // Import the file you created in Step 1
import "./index.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Now this works perfectly! ✅
export const metadata: Metadata = {
  title: 'Madrasah Arrohmah',
  description: 'Website Untuk Madrasah Arrohmah'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-200 overflow-x-hidden`}
      >
        {/* Pass children to the client wrapper */}
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}