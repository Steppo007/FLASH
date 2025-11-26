import {
  TabMenuPassThroughOptions,
  TabMenuThroughMethodOptions,
} from 'primereact/tabmenu';
import { classNames } from 'primereact/utils';

/**
 * @returns the Primereact pass-through options which make the
 * Primereact Tab Menu component take the form of the Krones KSideMenu component.
 */
export function getKSideMenuPTOptions(): TabMenuPassThroughOptions {
  return {
    root: (options: TabMenuThroughMethodOptions) => {
      return {
        className: classNames('kro-ksidemenu', options.props.className),
      };
    },
    label: {
      className: 'kro-line-clamp-1',
    },
    menuitem: {
      className: 'kro-knavitem-colors kro-knavitem-content-size',
    },
    action: {
      className: 'kro-outline-when-focus-visible',
    },
  };
}
