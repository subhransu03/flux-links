
export interface Shortcut {
  id: string;
  name: string;
  url: string;
  categoryId: string;
  iconUrl?: string;
  clickCount?: number;
}

export interface Category {
  id: string;
  name: string;
}

export interface Theme {
  name: string;
  value: string;
}

export interface Animation {
  name: string;
  value: 'off' | 'gradient' | 'particles' | 'spotlight' | 'lines' | 'polka' | 'cubes';
}

export type CardSize = 'sm' | 'md' | 'lg';

export interface ExportData {
  shortcuts: Shortcut[];
  categories: Category[];
}
