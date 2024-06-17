'use client';

import { useTheme } from 'next-themes';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { Monitor, MoonIcon, SunIcon } from 'lucide-react';
import { useIsServer } from '@/lib/hooks';

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const isServer = useIsServer();

  if (isServer) {
    return null;
  }

  return (
    <Tabs defaultValue={theme}>
      <TabsList className="border">
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
  );
}

export default ThemeSwitcher;
