import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import CommandMenu from "@/components/CommandMenu";

export const metadata: Metadata = {
  title: "Nexus | SaaS Dashboard",
  description: "AI Performance Monitoring",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex h-screen overflow-hidden bg-[#0A0A0A]">
        <CommandMenu />
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
