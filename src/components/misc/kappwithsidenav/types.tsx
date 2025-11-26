import { IKSideNav } from '../../menu/ksidenav';
import { ReactDivProps } from '../../utils/reactProps';

export interface KAppWithSideNavProps
  extends ReactDivProps,
    Omit<IKSideNav, 'sideBarAnchor'> {}
