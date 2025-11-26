import { ReactElement } from 'react';
import { MenuItem } from 'primereact/menuitem';
import { OverlayPanel } from 'primereact/overlaypanel';

export interface KMegaMenuProps extends KMegaMenuCallbacks {
  model?: MenuItem[];

  breakpoint: string;
  /**
   * id of menu item which should be styled as "active"
   */
  activeId?: string;
  /**
   * prevents default behaviour of anchors for the KMegaMenu leaf links
   * @default true
   */
  linkPreventDefault?: boolean;
  /**
   * the submenu column min width value for desktop view (in px)
   * @default breakpoint / (amount of submenus for a specific tab)
   */
  minColumnWidthDesktop?: string;
  /**
   * the submenu column max width value for desktop view (in px)
   * @default breakpoint / (amount of submenus for a specific tab)
   */
  maxColumnWidthDesktop?: string;
  /**
   * header that appears on the mobile topMenu view
   * @default monochrome Krones logo with no action
   */
  topMenuHeader?: ReactElement;
  /**
   * class names attached to a wrapper for both the desktop and mobile version
   */
  className?: string;
}

export interface TabbedMenuItem extends MenuItem {
  data: {
    ktabbed: {
      categoryLinkLabel: string;
      categoryControlLabel: string;
      categoryControlLabelMobile?: string;
      categorySelectorHeaderMobile?: string;
      categorySelectorHintMobile?: string;
    };
  };
  items: MenuItem[] | undefined;
}

export interface KMegaMenuRef {
  desktop: KMegaMenuDesktopRef | null;
}

export interface KMegaMenuDesktopRef {
  overlayPanel: OverlayPanel | null;
}

export interface KMegaMenuCallbacks {
  onOpenChange?: (isOpen: boolean) => void;
}
