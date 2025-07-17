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
}

export function ShortcutCard({ shortcut, onEdit, onDelete }: ShortcutCardProps) {
  const getFaviconUrl = (url: string) => {
    try {
      const urlObject = new URL(url);
      return `https://www.google.com/s2/favicons?sz=64&domain_url=${urlObject.hostname}`;
    } catch (error) {
      // Fallback for invalid URLs, though they should be validated by the form
      return `https://www.google.com/s2/favicons?sz=64&domain_url=${url}`;
    }
  };

  const iconSrc = shortcut.iconUrl || getFaviconUrl(shortcut.url);

  return (
    <Card className="group relative overflow-hidden bg-card/80 backdrop-blur-sm border-border/60 hover:border-primary/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20">
      <a href={shortcut.url} target="_blank" rel="noopener noreferrer" className="block p-4">
        <CardContent className="flex flex-col items-center justify-center gap-4 text-center p-0">
          <div className="relative h-16 w-16 flex items-center justify-center rounded-lg bg-secondary/70 group-hover:bg-primary/20 transition-colors">
            <Image
              src={iconSrc}
              alt={`${shortcut.name} icon`}
              width={40}
              height={40}
              className="rounded-md transition-transform duration-300 group-hover:scale-110 object-contain"
              unoptimized
            />
          </div>
          <p className="font-semibold truncate w-full text-foreground">{shortcut.name}</p>
        </CardContent>
      </a>
      <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
