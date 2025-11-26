import { MenuItem } from 'primereact/menuitem';
import { ReactDivProps } from '../../utils/reactProps';

export interface KSideNavItem extends Pick<MenuItem, 'id' | 'label' | 'icon'> {
  items?: KSideNavSubItem[];
}

type KSideNavSubItem = Pick<MenuItem, 'id' | 'label'>;

export interface IKSideNav {
  /**
   * The title of your FLASH service
   */
  productTitle: string;
  /**
   * the model which governs your service's page structure
   */
  navigationModel: KSideNavItem[];
  /**
   * where the side bar should anchor. This should be at your
   * application root.
   */
  sideBarAnchor: HTMLElement | 'self' | (() => HTMLElement);
  /**
   * Id of the current page in the provided model
   */
  currentPage?: string;
  /**
   * Called when the user clicked on a menu item
   */
  onPageChange?: (pageId: string) => void;
}

export interface KSideNavProps extends ReactDivProps, IKSideNav {}
