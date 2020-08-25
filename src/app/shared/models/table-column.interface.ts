export interface TableColumn<T> {
  label: string;
  property: keyof T | string;
  type: 'text' | 'image' | 'badge' | 'progress' | 'checkbox' | 'button' | 'color' | 'toggle' | 'actions';
  visible?: boolean;
  cssClasses?: string[];
}
