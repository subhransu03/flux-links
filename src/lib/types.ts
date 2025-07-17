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

export interface Theme {
  name: string;
  value: string;
}

export interface Animation {
  name: string;
  value: 'off' | 'aurora' | 'particles' | 'grid';
}
