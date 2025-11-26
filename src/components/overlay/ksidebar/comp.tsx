import { classNames } from 'primereact/utils';
import { KSidebarProps } from './types';
import { Sidebar, SidebarPassThroughOptions } from 'primereact/sidebar';
import { DoubleArrow } from '../../menu/ksidenav';

export function KSidebar({
  className,
  maskClassName,
  ...props
}: KSidebarProps) {
  const cn = classNames(className, 'kro-ksidebar');
  const maskCn = classNames(maskClassName, 'kro-ksidebarmask');
  const pt: SidebarPassThroughOptions = {
    closeButton: {
      className: 'kro-outline-when-focused',
    },
  };

  return (
    <Sidebar
      className={cn}
      maskClassName={maskCn}
      pt={pt}
      closeIcon={<DoubleArrow />}
      {...props}
    />
  );
}
