export interface TableColumn<T> {
  label: string;
  property: keyof T | string;
  type: 'text' | 'image' | 'badge' | 'progress' | 'checkbox' | 'button' | 'color' | 'toggle' | 'actions';
  disabled?: boolean;
  visible?: boolean;
  align?: 'start' | 'center' | 'end';
  sort?: boolean;
  cssClasses?: string[];
}
