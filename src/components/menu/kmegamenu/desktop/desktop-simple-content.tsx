import { MenuItem } from 'primereact/menuitem';
import { KMegaMenuProps } from '../types';
import { ColumnGrid } from './comp-desktop-common';

export const SimpleContent = (
  props: Pick<KMegaMenuProps, 'activeId'> & {
    menuModel: MenuItem | undefined;
    hideMenu: () => void;
  }
) => {
  return <ColumnGrid {...props} />;
};
