
'use client';

import Image from 'next/image';
import type { Shortcut } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { MoreVertical, Edit, Trash2, BarChart2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ShortcutCardProps {
  shortcut: Shortcut;
  onEdit: () => void;
  onDelete: () => void;
  onClick: () => void;
  isDragging?: boolean;
}

export function ShortcutCard({ shortcut, onEdit, onDelete, onClick, isDragging = false }: ShortcutCardProps) {
  const getFaviconUrl = (url: string) => {
    try {
      const urlObject = new URL(url);
      return `https://www.google.com/s2/favicons?sz=64&domain_url=${urlObject.hostname}`;
    } catch (error) {
      return `https://www.google.com/s2/favicons?sz=64&domain_url=${url}`;
    }
  };

  const iconSrc = shortcut.iconUrl || getFaviconUrl(shortcut.url);

  return (
    <Card className={`group/card aspect-square relative overflow-hidden bg-card backdrop-blur-sm border-border/60 hover:border-primary/50 transition-all duration-300 ease-in-out shadow-lg hover:shadow-primary/20 
      ${isDragging ? 'border-primary/80 border-2 scale-105 -rotate-3 shadow-2xl shadow-primary/40' : 'hover:-translate-y-1'}
      data-[theme=neumorphism]:shadow-[5px_5px_10px_#bcbcbc,-5px_-5px_10px_#ffffff]
      dark:data-[theme=neumorphism]:shadow-[5px_5px_10px_#1a1a1a,-5px_-5px_10px_#2a2a2a]
      data-[theme=glassmorphism]:bg-card/50 dark:data-[theme=glassmorphism]:bg-card/50
      data-[theme=cyberpunk]:border-primary/50 data-[theme=cyberpunk]:hover:border-accent
      `}
    >
      <a 
        href={shortcut.url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block p-4 h-full cursor-pointer" 
        draggable="false" 
        onMouseDown={onClick}
      >
        <CardContent className="flex flex-col items-center justify-center gap-4 text-center p-0 h-full">
          <div className="relative h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center rounded-lg bg-secondary/70 group-hover/card:bg-primary/20 transition-colors">
            <Image
              src={iconSrc}
              alt={`${shortcut.name} icon`}
              width={40}
              height={40}
              className="rounded-md transition-transform duration-300 group-hover/card:scale-110 object-contain w-8 h-8 sm:w-10 sm:h-10"
              unoptimized
            />
             {(shortcut.clickCount ?? 0) > 0 && (
              <div className="absolute -top-1 -right-2 bg-accent text-accent-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                <BarChart2 className="h-3 w-3" />
                {shortcut.clickCount}
              </div>
            )}
          </div>
          <p className="font-semibold truncate w-full text-foreground text-sm sm:text-base">{shortcut.name}</p>
        </CardContent>
      </a>
      <div className="absolute top-1 right-1 opacity-0 group-hover/card:opacity-100 transition-opacity">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}>
              <Edit className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Trash2 className="mr-2 h-4 w-4 text-destructive" />
                  <span className="text-destructive">Delete</span>
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the shortcut for "{shortcut.name}".
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
}
