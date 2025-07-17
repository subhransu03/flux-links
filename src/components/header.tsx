
'use client';

import { Input } from './ui/input';
import { Button } from './ui/button';
import { PlusCircle, Search, Palette, Film, Grid2X2 } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { Icons } from './icons';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import type { Theme, Animation, CardSize } from '@/lib/types';

interface AppHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onAddNew: () => void;
  themes: Theme[];
  setTheme: (theme: Theme) => void;
  animations: Animation[];
  activeAnimation: Animation;
  setActiveAnimation: (animation: Animation) => void;
  setCardSize: (size: CardSize) => void;
}

export function AppHeader({ 
  searchQuery, 
  setSearchQuery, 
  onAddNew, 
  themes, 
  setTheme, 
  animations, 
  activeAnimation, 
  setActiveAnimation,
  setCardSize,
}: AppHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-3">
        <Icons.logo />
        <h1 className="text-2xl sm:text-3xl font-bold font-headline text-foreground tracking-wide">
          FluxLink
        </h1>
      </div>
      <div className="flex items-center gap-1 md:gap-2 w-full md:w-auto">
        <div className="relative flex-grow md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search shortcuts..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={onAddNew} size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Add New</span>
          <span className="sm:hidden">Add</span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Grid2X2 className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Change Card Size</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setCardSize('sm')}>Small</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCardSize('md')}>Medium</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCardSize('lg')}>Large</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Film className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Change Animation</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {animations.map((anim) => (
              <DropdownMenuItem key={anim.value} onClick={() => setActiveAnimation(anim)}>
                {anim.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Palette className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Change Theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {themes.map((theme) => (
              <DropdownMenuItem key={theme.value} onClick={() => setTheme(theme)}>
                {theme.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <ThemeToggle />
      </div>
    </header>
  );
}
