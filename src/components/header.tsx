'use client';

import { Input } from './ui/input';
import { Button } from './ui/button';
import { PlusCircle, Search } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { Icons } from './icons';

interface AppHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onAddNew: () => void;
}

export function AppHeader({ searchQuery, setSearchQuery, onAddNew }: AppHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-3">
        <Icons.logo />
        <h1 className="text-2xl sm:text-3xl font-bold font-headline text-foreground tracking-wide">
          Flux Links
        </h1>
      </div>
      <div className="flex items-center gap-2 w-full md:w-auto">
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
          Add New
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
}
