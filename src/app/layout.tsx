export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CV-improver",
  description:
    "Web application that allows users to create, edit, and export resumes. The app integrates AI-driven suggestions to improve resumes for better alignment with ATS (Applicant Tracking Systems) based on general best practices and personalized feedback",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-background min-h-screen min-w-full ",
          dmSans.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
