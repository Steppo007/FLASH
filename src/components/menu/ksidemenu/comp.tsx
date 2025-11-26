import { TabMenu } from 'primereact/tabmenu';
import { KSideMenuProps, getKSideMenuPTOptions } from '.';

/**
 * Returns a KSideMenu component.
 */
export const KSideMenu = ({ ...props }: KSideMenuProps) => {
  return <TabMenu pt={getKSideMenuPTOptions()} {...props} unstyled />;
};
