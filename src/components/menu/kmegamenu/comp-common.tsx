import { MenuItem } from 'primereact/menuitem';
import { TabbedMenuItem } from './types';

/**
 * Type guard to check if a MenuItem is a TabbedMenuItem
 * @param menuItem The menu item to check
 * @returns True if the menuItem is a TabbedMenuItem
 */
export function isTabbedMenuItem(
  menuItem: MenuItem | undefined
): menuItem is TabbedMenuItem {
  return (
    menuItem !== null &&
    menuItem !== undefined &&
    typeof menuItem === 'object' &&
    menuItem.data !== null &&
    typeof menuItem.data === 'object' &&
    typeof menuItem.data.ktabbed === 'object' &&
    menuItem.data.ktabbed !== null &&
    typeof menuItem.data.ktabbed.categoryLinkLabel === 'string' &&
    typeof menuItem.data.ktabbed.categoryControlLabel === 'string'
  );
}

export function isSimpleItem(menuItem: MenuItem | undefined): boolean {
  return (
    menuItem !== null &&
    menuItem !== undefined &&
    typeof menuItem === 'object' &&
    menuItem.items === undefined
  );
}
