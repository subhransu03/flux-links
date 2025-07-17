
'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import type { Category, Shortcut, Theme, Animation, CardSize } from '@/lib/types';
import { DEFAULT_CATEGORIES, DEFAULT_SHORTCUTS, THEMES, ANIMATIONS } from '@/lib/data';
import { AppHeader } from '@/components/header';
import { CategoryTabs } from '@/components/category-tabs';
import { ShortcutCard } from '@/components/shortcut-card';
import { ShortcutDialog } from '@/components/shortcut-dialog';
import { Button } from './ui/button';
import { PlusCircle } from 'lucide-react';
import { AnimatedBackgrounds } from './animated-backgrounds';
import { cn } from '@/lib/utils';

export function FluxLinksApp() {
  const [shortcuts, setShortcuts] = useLocalStorage<Shortcut[]>('shortcuts-v7', DEFAULT_SHORTCUTS);
  const [categories, setCategories] = useLocalStorage<Category[]>('categories-v7', DEFAULT_CATEGORIES);
  const [cardSize, setCardSize] = useLocalStorage<CardSize>('card-size-v7', 'md');

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [editingShortcut, setEditingShortcut] = useState<Shortcut | null>(null);
  const [isShortcutDialogOpen, setIsShortcutDialogOpen] = useState(false);
  const [draggedItem, setDraggedItem] = useState<Shortcut | null>(null);
  const [theme, setTheme] = useState<Theme>(THEMES[0]);
  const [activeAnimation, setActiveAnimation] = useLocalStorage<Animation>('active-animation-v7', ANIMATIONS[0]);

  const [visibleShortcuts, setVisibleShortcuts] = useState<Shortcut[]>([]);

  const filteredShortcuts = useMemo(() => {
    return shortcuts.filter(shortcut => {
      const matchesCategory = !activeCategoryId || shortcut.categoryId === activeCategoryId;
      const matchesSearch = shortcut.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [shortcuts, activeCategoryId, searchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleShortcuts(filteredShortcuts);
    }, 100);
    return () => clearTimeout(timer);
  }, [filteredShortcuts]);

  const handleSaveShortcut = (shortcut: Shortcut) => {
    if (editingShortcut) {
      setShortcuts(prev => prev.map(s => (s.id === shortcut.id ? shortcut : s)));
    } else {
      setShortcuts(prev => [...prev, shortcut]);
    }
    setEditingShortcut(null);
  };
  
  const handleDeleteShortcut = (id: string) => {
    setShortcuts(prev => prev.filter(s => s.id !== id));
  };

  const handleEditShortcut = (shortcut: Shortcut) => {
    setEditingShortcut(shortcut);
    setIsShortcutDialogOpen(true);
  };

  const openNewShortcutDialog = () => {
    setEditingShortcut(null);
    setIsShortcutDialogOpen(true);
  }

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, shortcut: Shortcut) => {
    setDraggedItem(shortcut);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', shortcut.id);
  };
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const target = e.currentTarget as HTMLDivElement;
    if (target.dataset.droppable) {
      target.classList.add('bg-primary/10');
    }
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLDivElement;
    target.classList.remove('bg-primary/10');
  }, []);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetShortcut: Shortcut) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.id === targetShortcut.id) {
      return;
    }

    const currentItems = [...shortcuts];
    const draggedIndex = currentItems.findIndex(item => item.id === draggedItem.id);
    const targetIndex = currentItems.findIndex(item => item.id === targetShortcut.id);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const [reorderedItem] = currentItems.splice(draggedIndex, 1);
    currentItems.splice(targetIndex, 0, reorderedItem);

    setShortcuts(currentItems);
    const targetElement = e.currentTarget as HTMLDivElement;
    targetElement.classList.remove('bg-primary/10');
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };
  
  const gridClasses = {
    sm: 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10',
    md: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7',
    lg: 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6',
  };

  return (
    <div className="relative min-h-screen">
      <AnimatedBackgrounds animation={activeAnimation} />
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl" data-theme={theme.value}>
        <AppHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onAddNew={openNewShortcutDialog}
          themes={THEMES}
          setTheme={setTheme}
          animations={ANIMATIONS}
          activeAnimation={activeAnimation}
          setActiveAnimation={setActiveAnimation}
          setCardSize={setCardSize}
        />

        <CategoryTabs
          categories={categories}
          setCategories={setCategories}
          activeCategoryId={activeCategoryId}
          setActiveCategoryId={setActiveCategoryId}
          shortcuts={shortcuts}
          setShortcuts={setShortcuts}
        />

        {visibleShortcuts.length > 0 ? (
          <div
            className={cn("grid gap-4 sm:gap-6 py-8", gridClasses[cardSize])}
          >
            {visibleShortcuts.map((shortcut, index) => (
              <div
                key={shortcut.id}
                draggable
                onDragStart={(e) => handleDragStart(e, shortcut)}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, shortcut)}
                onDragEnd={handleDragEnd}
                data-droppable="true"
                className="rounded-lg transition-all duration-300"
                style={{
                  transition: 'transform 300ms ease-in-out, opacity 300ms ease-in-out',
                  animation: `fadeInUp 0.5s ${index * 0.05}s ease-out forwards`,
                  opacity: 0,
                }}
              >
                <ShortcutCard
                  shortcut={shortcut}
                  onEdit={() => handleEditShortcut(shortcut)}
                  onDelete={() => handleDeleteShortcut(shortcut.id)}
                  isDragging={draggedItem?.id === shortcut.id}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20">
            <h3 className="font-headline text-2xl font-medium text-muted-foreground">No shortcuts found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
            <Button onClick={openNewShortcutDialog} className="mt-6">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Your First Shortcut
            </Button>
          </div>
        )}

        <ShortcutDialog
          isOpen={isShortcutDialogOpen}
          setIsOpen={setIsShortcutDialogOpen}
          onSave={handleSaveShortcut}
          shortcut={editingShortcut}
          categories={categories}
        />

        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
