'use client';

import { useState, useMemo } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import type { Category, Shortcut } from '@/lib/types';
import { DEFAULT_CATEGORIES, DEFAULT_SHORTCUTS } from '@/lib/data';
import { AppHeader } from '@/components/header';
import { CategoryTabs } from '@/components/category-tabs';
import { ShortcutCard } from '@/components/shortcut-card';
import { ShortcutDialog } from '@/components/shortcut-dialog';
import { Button } from './ui/button';
import { PlusCircle } from 'lucide-react';

export function FluxLinksApp() {
  const [shortcuts, setShortcuts] = useLocalStorage<Shortcut[]>('shortcuts-v2', DEFAULT_SHORTCUTS);
  const [categories, setCategories] = useLocalStorage<Category[]>('categories-v2', DEFAULT_CATEGORIES);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [editingShortcut, setEditingShortcut] = useState<Shortcut | null>(null);
  const [isShortcutDialogOpen, setIsShortcutDialogOpen] = useState(false);

  const filteredShortcuts = useMemo(() => {
    return shortcuts.filter(shortcut => {
      const matchesCategory = !activeCategoryId || shortcut.categoryId === activeCategoryId;
      const matchesSearch = shortcut.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [shortcuts, activeCategoryId, searchQuery]);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <AppHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onAddNew={openNewShortcutDialog}
      />

      <CategoryTabs
        categories={categories}
        setCategories={setCategories}
        activeCategoryId={activeCategoryId}
        setActiveCategoryId={setActiveCategoryId}
        shortcuts={shortcuts}
        setShortcuts={setShortcuts}
      />

      {filteredShortcuts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 py-8">
          {filteredShortcuts.map(shortcut => (
            <ShortcutCard
              key={shortcut.id}
              shortcut={shortcut}
              onEdit={() => handleEditShortcut(shortcut)}
              onDelete={() => handleDeleteShortcut(shortcut.id)}
            />
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
    </div>
  );
}
