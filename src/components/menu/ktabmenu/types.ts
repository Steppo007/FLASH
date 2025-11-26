import { TabMenuProps } from 'primereact/tabmenu';

export type KTabMenuSize = 'small' | 'default';
export interface KTabMenuPTProps {
  size?: KTabMenuSize;
}

export interface KTabMenuProps
  extends KTabMenuPTProps,
    Omit<TabMenuProps, 'pt' | 'unstyled'> {}
