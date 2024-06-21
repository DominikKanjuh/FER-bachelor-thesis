export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
// import db from '@/lib/supabase/db';

const dmSans = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // console.log(db);

  return (
    <html lang="en">
      <body className={cn('bg-background min-h-screen min-w-full ', dmSans.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
