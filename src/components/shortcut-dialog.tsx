'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Shortcut, Category } from '@/lib/types';
import { suggestCategory } from '@/ai/flows/suggest-category';
import { useToast } from '@/hooks/use-toast';
import { Wand2, Loader2 } from 'lucide-react';
import { Badge } from './ui/badge';

interface ShortcutDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSave: (shortcut: Shortcut) => void;
  shortcut: Shortcut | null;
  categories: Category[];
}

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  url: z.string().url('Must be a valid URL'),
  categoryId: z.string().min(1, 'Category is required'),
  iconUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

export function ShortcutDialog({ isOpen, setIsOpen, onSave, shortcut, categories }: ShortcutDialogProps) {
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestedCategories, setSuggestedCategories] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      url: '',
      categoryId: '',
      iconUrl: '',
    },
  });
  
  const urlValue = form.watch("url");

  useEffect(() => {
    if (shortcut) {
      form.reset({
        name: shortcut.name,
        url: shortcut.url,
        categoryId: shortcut.categoryId,
        iconUrl: shortcut.iconUrl || '',
      });
    } else {
      form.reset({
        name: '',
        url: '',
        categoryId: '',
        iconUrl: '',
      });
    }
    setSuggestedCategories([]);
  }, [shortcut, isOpen, form]);

  const handleSuggestCategory = async () => {
    const url = form.getValues('url');
    if (!url || !form.getFieldState('url').isDirty) {
        toast({variant: "destructive", title: "URL required", description: "Please enter a URL to get suggestions."});
        return;
    }
    
    try {
        new URL(url);
    } catch (error) {
        form.setError("url", { type: "manual", message: "Please enter a valid URL." });
        return;
    }
    
    setIsSuggesting(true);
    setSuggestedCategories([]);
    try {
      const result = await suggestCategory({ url });
      const suggestions = result.categories.filter(s => !!s);
      if (suggestions.length > 0) {
        setSuggestedCategories(suggestions);
      } else {
        toast({ title: "No suggestions found", description: "Couldn't find any relevant categories for this URL." });
      }
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "Suggestion failed", description: "Could not get AI suggestions. Please try again." });
    } finally {
      setIsSuggesting(false);
    }
  };
  
  const applySuggestion = (categoryName: string) => {
    const existingCategory = categories.find(c => c.name.toLowerCase() === categoryName.toLowerCase());
    if(existingCategory) {
        form.setValue("categoryId", existingCategory.id, { shouldValidate: true });
    } else {
        toast({variant: "destructive", title: "Category not found", description: `Please create a "${categoryName}" category first.`})
    }
    setSuggestedCategories([]);
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onSave({
      ...values,
      id: shortcut?.id || crypto.randomUUID(),
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{shortcut ? 'Edit Shortcut' : 'Add New Shortcut'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. GitHub" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="iconUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://.../icon.png" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <div className='flex items-center gap-2'>
                    <Select onValueChange={field.onChange} value={field.value} required>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button type="button" variant="outline" size="icon" onClick={handleSuggestCategory} disabled={isSuggesting || !urlValue}>
                        {isSuggesting ? <Loader2 className="h-4 w-4 animate-spin"/> : <Wand2 className="h-4 w-4"/>}
                        <span className="sr-only">Suggest Category</span>
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
             {suggestedCategories.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                    <span className="text-sm text-muted-foreground mr-2">Suggestions:</span>
                    {suggestedCategories.map((s, i) => (
                        <Badge key={i} variant="outline" className="cursor-pointer hover:bg-accent" onClick={() => applySuggestion(s)}>{s}</Badge>
                    ))}
                </div>
            )}
            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
