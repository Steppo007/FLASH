import { classNames } from 'primereact/utils';

/**
 * Returns PrimeReact PassThrough options for customizing Sidebar styles
 */
export function getSidebarPassThroughOptions() {
  return {
    root: {
      className: classNames('kro-menu-sidebar'),
    },
    header: {
      className: classNames('kro-menu-sidebar-header'),
    },
    icons: {
      className: classNames('kro-menu-sidebar-icons'),
    },
    closeButton: {
      className: classNames(
        'kro-menu-sidebar-close-button kro-knavitem-colors'
      ),
    },
  };
}
