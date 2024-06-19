'use client';

import { useTheme } from 'next-themes';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { Monitor, MoonIcon, SunIcon } from 'lucide-react';
import { useIsServer } from '@/lib/hooks';
import { Button } from '../ui/button';

function ThemeSwitcher() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const isServer = useIsServer();

  if (isServer) {
    return null;
  }

  return (
    <>
      <Tabs defaultValue={theme} className="hidden md:block">
        <TabsList>
          <TabsTrigger value="light" onClick={() => setTheme('light')}>
            <SunIcon className="h-[1.2rem] w-[1.2rem]" />
          </TabsTrigger>
          <TabsTrigger value="dark" onClick={() => setTheme('dark')}>
            <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
          </TabsTrigger>
          <TabsTrigger value="system" onClick={() => setTheme('system')}>
            <Monitor className="h-[1.2rem] w-[1.2rem]" />
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Button
        variant={'outline'}
        onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}
        className="flex md:hidden w-10 h-10 p-0 justify-center items-center"
      >
        <SunIcon size="24" className="absolute rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon size="24" className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    </>
  );
}

export default ThemeSwitcher;
