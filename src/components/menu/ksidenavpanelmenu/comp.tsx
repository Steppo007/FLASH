import { PanelMenu } from 'primereact/panelmenu';
import { KSideNavPanelMenuProps } from './types';
import { classNames } from 'primereact/utils';

export function KSideNavPanelMenu(props: KSideNavPanelMenuProps) {
  const cn = classNames(props.className, 'kro-ksidenavpanelmenu');
  return <PanelMenu {...props} className={cn} />;
}
