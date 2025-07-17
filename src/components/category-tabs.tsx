
'use client';
import { useRef, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ListPlus, Trash2, Download, Upload } from 'lucide-react';
import type { Category, Shortcut, ExportData } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import { Separator } from './ui/separator';

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
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleExport = () => {
    const exportData: ExportData = { shortcuts, categories };
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `fluxlink-backup-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    toast({title: "Export successful!", description: "Your data has been saved."});
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text !== 'string') throw new Error("File is not valid text");
        const importedData: ExportData = JSON.parse(text);

        // Basic validation
        if (!Array.isArray(importedData.shortcuts) || !Array.isArray(importedData.categories)) {
            throw new Error("Invalid file format");
        }

        setShortcuts(importedData.shortcuts);
        setCategories(importedData.categories);
        setIsManagerOpen(false);
        toast({ title: "Import Successful!", description: "Your shortcuts and categories have been restored." });
      } catch (error) {
        toast({ variant: "destructive", title: "Import Failed", description: `The file is not valid. ${error instanceof Error ? error.message : ''}`});
      }
    };
    reader.readAsText(file);
    // Reset file input
    event.target.value = '';
  };


  return (
    <>
      <div className="flex items-center gap-2">
        <ScrollArea className="w-full whitespace-nowrap">
            <Tabs value={activeCategoryId || 'all'} onValueChange={(value) => setActiveCategoryId(value === 'all' ? null : value)} className="w-full">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <Button variant="outline" size="sm" onClick={() => setIsManagerOpen(true)} className="flex-shrink-0">
          <ListPlus className="h-4 w-4" />
          <span className="ml-2 hidden sm:inline">Manage</span>
        </Button>
      </div>

      <Dialog open={isManagerOpen} onOpenChange={setIsManagerOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Data & Categories</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 my-4">
            <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Import / Export</h3>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleImportClick} className="w-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Import from File
                    </Button>
                    <input type="file" ref={fileInputRef} onChange={handleImport} accept=".json" className="hidden" />
                    <Button variant="outline" onClick={handleExport} className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Export to File
                    </Button>
                </div>
            </div>
            <Separator />
             <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Categories</h3>
                <div className="flex items-center space-x-2">
                    <Input
                    placeholder="New category name..."
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                    />
                    <Button onClick={handleAddCategory}>Add</Button>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
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
             </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsManagerOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
