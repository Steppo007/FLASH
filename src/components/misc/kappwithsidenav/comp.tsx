import { useRef } from 'react';
import { KAppWithSideNavProps } from './types';
import { KSideNav } from '../../menu/ksidenav';
import { classNames } from 'primereact/utils';

export function KAppWithSideNav(props: KAppWithSideNavProps) {
  const {
    className,
    currentPage,
    onPageChange,
    navigationModel,
    productTitle,
    children,
    ...divProps
  } = props;
  const sideBarAnchor = useRef<HTMLDivElement>(null);
  const getSideBarAnchor = () => sideBarAnchor.current ?? document.body;
  const cn = classNames(className, 'kro-kappwithsidenav');

  return (
    <div ref={sideBarAnchor} className={cn} {...divProps}>
      <KSideNav
        currentPage={currentPage}
        onPageChange={onPageChange}
        navigationModel={navigationModel}
        productTitle={productTitle}
        sideBarAnchor={getSideBarAnchor}
      />
      <div className="kro-app-container">{children}</div>
    </div>
  );
}
