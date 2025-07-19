
'use client';

import Image from 'next/image';
import type { Shortcut } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { MoreVertical, Edit, Trash2 } from 'lucide-react';
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
  isDragging?: boolean;
}

export function ShortcutCard({ shortcut, onEdit, onDelete, isDragging = false }: ShortcutCardProps) {
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
    <Card className={`group/card aspect-square relative overflow-hidden bg-card backdrop-blur-sm border-border/60 hover:border-primary/50 transition-all duration-300 ease-in-out shadow-lg hover:shadow-primary/30 hover:shadow-2xl hover:scale-105
      ${isDragging ? 'border-primary/80 border-2 scale-110 shadow-2xl shadow-primary/40' : 'hover:-translate-y-1'}
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
        className="block p-3 h-full cursor-pointer" 
        draggable="false" 
      >
        <CardContent className="flex flex-col items-center justify-center gap-4 text-center p-0 h-full">
          <div className="relative h-20 w-20 flex items-center justify-center rounded-lg bg-secondary/70 group-hover/card:bg-primary/20 transition-colors">
            <Image
              src={iconSrc}
              alt={`${shortcut.name} icon`}
              width={64}
              height={64}
              className="rounded-md transition-transform duration-300 group-hover/card:scale-110 object-contain w-12 h-12"
              unoptimized
            />
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
