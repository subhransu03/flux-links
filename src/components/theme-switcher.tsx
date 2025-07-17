'use client';

import * as React from 'react';
import { Paintbrush } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const THEMES = [
  { name: 'Oasis', class: 'theme-oasis' },
  { name: 'Nebula', class: 'theme-nebula' },
  { name: 'Cyber', class: 'theme-cyber' },
  { name: 'Sunset', class: 'theme-sunset' },
  { name: 'Default', class: ''},
];

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();
  
  const handleThemeChange = (newThemeClass: string) => {
    
    const body = document.body;
    // Remove all theme classes
    THEMES.forEach(t => {
      if (t.class) body.classList.remove(t.class);
    });

    // Add the new theme class
    if (newThemeClass) {
      body.classList.add(newThemeClass);
    }
    
    // We can store the custom theme choice in local storage
    // if we want it to persist across reloads.
    localStorage.setItem('custom-theme', newThemeClass);
  };
  
  React.useEffect(() => {
    // On mount, check if there's a custom theme in local storage
    const savedTheme = localStorage.getItem('custom-theme');
    if (savedTheme) {
        handleThemeChange(savedTheme);
    } else {
        // Set the default theme if none is saved
        handleThemeChange('theme-oasis');
    }
  }, []);


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Paintbrush className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {THEMES.map(t => (
          <DropdownMenuItem key={t.name} onClick={() => handleThemeChange(t.class)}>
            {t.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
