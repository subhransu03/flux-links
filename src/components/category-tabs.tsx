'use client';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ListPlus, Trash2 } from 'lucide-react';
import type { Category, Shortcut } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';

interface CategoryTabsProps {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  activeCategoryId: string | null;
  setActiveCategoryId: (id: string | null) => void;
  shortcuts: Shortcut[];
  setShortcuts: (shortcuts: Shortcut[]) => void;
}

export function CategoryTabs({ categories, setCategories, activeCategoryId, setActiveCategoryId, shortcuts, setShortcuts }: CategoryTabsProps) {
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const { toast } = useToast();

  const handleAddCategory = () => {
    if (newCategoryName.trim() && !categories.some(c => c.name.toLowerCase() === newCategoryName.trim().toLowerCase())) {
      const newCategory: Category = {
        id: crypto.randomUUID(),
        name: newCategoryName.trim(),
      };
      setCategories([...categories, newCategory]);
      setNewCategoryName('');
      toast({ title: "Category added!", description: `"${newCategory.name}" has been created.` });
    } else {
        toast({ variant: "destructive", title: "Error", description: "Category name must be unique and not empty." });
    }
  };

  const handleDeleteCategory = (idToDelete: string) => {
    const categoryToDelete = categories.find(c => c.id === idToDelete);
    if (!categoryToDelete) return;

    const uncategorized = categories.find(c => c.name.toLowerCase() === 'uncategorized');
    let uncategorizedId = uncategorized?.id;

    if (!uncategorized) {
      const newUncategorizedCategory = { id: crypto.randomUUID(), name: 'Uncategorized' };
      setCategories([...categories.filter(c => c.id !== idToDelete), newUncategorizedCategory]);
      uncategorizedId = newUncategorizedCategory.id;
    } else {
      setCategories(categories.filter(c => c.id !== idToDelete));
    }
    
    setShortcuts(shortcuts.map(s => s.categoryId === idToDelete ? { ...s, categoryId: uncategorizedId! } : s));
    
    if (activeCategoryId === idToDelete) {
      setActiveCategoryId(null);
    }
    toast({ title: "Category deleted", description: `"${categoryToDelete.name}" has been removed.` });
  };


  return (
    <>
      <div className="flex items-center gap-2">
        <Tabs value={activeCategoryId || 'all'} onValueChange={(value) => setActiveCategoryId(value === 'all' ? null : value)}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Button variant="outline" size="sm" onClick={() => setIsManagerOpen(true)}>
          <ListPlus className="h-4 w-4" />
          <span className="ml-2 hidden sm:inline">Manage Categories</span>
        </Button>
      </div>

      <Dialog open={isManagerOpen} onOpenChange={setIsManagerOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Categories</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2 my-4">
            <Input
              placeholder="New category name..."
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
            />
            <Button onClick={handleAddCategory}>Add</Button>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {categories.map((cat) => (
              <div key={cat.id} className="flex items-center justify-between p-2 rounded-md bg-secondary">
                <span>{cat.name}</span>
                {cat.name.toLowerCase() !== 'uncategorized' && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will delete the "{cat.name}" category. Shortcuts in this category will be moved to "Uncategorized". This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteCategory(cat.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsManagerOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
