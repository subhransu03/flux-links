export interface Shortcut {
  id: string;
  name: string;
  url: string;
  categoryId: string;
  iconUrl?: string;
}

export interface Category {
  id: string;
  name: string;
}
