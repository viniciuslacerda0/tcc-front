export interface DrawerProps {
  onClose: () => void;
  isOpen: boolean;
  anchor: 'left' | 'right';
}
