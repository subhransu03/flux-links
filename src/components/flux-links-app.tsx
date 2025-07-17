'use client';

import { useState, useMemo, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import type { Category, Shortcut, Theme } from '@/lib/types';
import { DEFAULT_CATEGORIES, DEFAULT_SHORTCUTS, THEMES } from '@/lib/data';
import { AppHeader } from '@/components/header';
import { CategoryTabs } from '@/components/category-tabs';
import { ShortcutCard } from '@/components/shortcut-card';
import { ShortcutDialog } from '@/components/shortcut-dialog';
import { Button } from './ui/button';
import { PlusCircle } from 'lucide-react';
import { AnimatedBackground } from './animated-background';

export function FluxLinksApp() {
  const [shortcuts, setShortcuts] = useLocalStorage<Shortcut[]>('shortcuts-v5', DEFAULT_SHORTCUTS);
  const [categories, setCategories] = useLocalStorage<Category[]>('categories-v5', DEFAULT_CATEGORIES);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [editingShortcut, setEditingShortcut] = useState<Shortcut | null>(null);
  const [isShortcutDialogOpen, setIsShortcutDialogOpen] = useState(false);
  const [draggedItem, setDraggedItem] = useState<Shortcut | null>(null);
  const [theme, setTheme] = useState<Theme>(THEMES[0]);
  const [showAnimations, setShowAnimations] = useLocalStorage('show-animations', true);
  
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

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); 
    e.dataTransfer.dropEffect = 'move';
  };
  
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
    setDraggedItem(null);
  };
  
  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <div className="relative min-h-screen">
      {showAnimations && <AnimatedBackground />}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-screen-2xl" data-theme={theme.value}>
        <AppHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onAddNew={openNewShortcutDialog}
          themes={THEMES}
          setTheme={setTheme}
          showAnimations={showAnimations}
          setShowAnimations={setShowAnimations}
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
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 py-8"
              onDragOver={handleDragOver}
          >
            {visibleShortcuts.map((shortcut, index) => (
              <div 
                  key={shortcut.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, shortcut)}
                  onDrop={(e) => handleDrop(e, shortcut)}
                  onDragEnd={handleDragEnd}
                  className={`transition-opacity duration-300 ${draggedItem?.id === shortcut.id ? 'opacity-50' : 'opacity-100'}`}
                  style={{
                    transition: 'opacity 300ms ease-in-out, transform 300ms ease-in-out',
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
