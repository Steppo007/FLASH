import { KMegaMenuCallbacks, KMegaMenuProps } from '../types';
import { useState } from 'react';
import { MenuItem } from 'primereact/menuitem';
import { Sidebar } from 'primereact/sidebar';
import KMenu from '../../kmenu';
import { KNavItem } from '../../knavitem';
import BackArrow from '../../../svg-workaround/BackArrow';
import BurgerMenu from '../../../svg-workaround/BurgerMenu';
import KronesLogo from '../../../svg-workaround/KronesLogo';
import { buildTopMenuModel } from './top-menu';
import { buildItemMenuModel, useTabbedMenu } from './item-menu';
import { MenuTransitionWrapper } from './transition';
import { useMenuNavigationState } from './hooks/useMenuNavigationState';
import { getSidebarPassThroughOptions } from './pt';

/**
 * Mobile burger menu component that displays a sliding sidebar navigation
 */
export const MobileBurgerMenu = (
  props: Pick<KMegaMenuProps, 'model' | 'activeId' | 'topMenuHeader'> &
    KMegaMenuCallbacks
) => {
  const { model, activeId, topMenuHeader } = props;

  const menuNavigationState = useMenuNavigationState();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const closeSideBar = () => setIsSidebarVisible(false);
  const openSidebar = () => setIsSidebarVisible(true);

  const topMenuModel = buildTopMenuModel({
    closeSideBar,
    selectSubmenu: menuNavigationState.navigateToSubmenu,
    model,
    activeId,
  });

  // Get the currently selected submenu for display
  const currentSubmenu = model?.find(
    (submenu) => submenu.id === menuNavigationState.currentSubmenuId
  );

  // Manage tabbed menu state if the current submenu has tabs
  const tabbedMenuState = useTabbedMenu(currentSubmenu, closeSideBar);

  // Build item menu model with commands and tab navigation
  const itemMenuModel = buildItemMenuModel({
    closeSideBar,
    model: currentSubmenu?.items as MenuItem[] | undefined,
    itemTabbedStatusState: tabbedMenuState,
    activeId,
  });

  // Determine which header to show based on navigation state
  const headerComponent = menuNavigationState.isTopMenuVisible ? (
    <TopMenuHeader template={topMenuHeader} onClose={closeSideBar} />
  ) : (
    <SubmenuHeader
      label={currentSubmenu?.label ?? ''}
      onBackToTopMenu={menuNavigationState.navigateToTopMenu}
    />
  );

  return (
    <div>
      <Sidebar
        visible={isSidebarVisible}
        onShow={() => props.onOpenChange?.(true)}
        onHide={() => {
          closeSideBar();
          props.onOpenChange?.(false);
        }}
        pt={getSidebarPassThroughOptions()}
        header={headerComponent}
        maskClassName="kro-kactionselector-mask"
        blockScroll
      >
        {/* Top-level menu with slide-in/out animation */}
        <MenuTransitionWrapper
          isVisible={menuNavigationState.isTopMenuVisible}
          transitionClassName="kro-menu-sidebar-top-menu-animation"
        >
          <KMenu
            model={topMenuModel}
            className="kro-menu-sidebar-content-menu"
          />
        </MenuTransitionWrapper>

        {/* Submenu with slide-in/out animation */}
        <MenuTransitionWrapper
          isVisible={!menuNavigationState.isTopMenuVisible}
          transitionClassName="kro-menu-sidebar-item-menu-animation"
        >
          {tabbedMenuState.actionSelector}
          <KMenu
            model={itemMenuModel}
            className="kro-menu-sidebar-content-menu"
          />
        </MenuTransitionWrapper>
      </Sidebar>

      <KNavItem
        icon={activeId ? <BackArrow /> : <BurgerMenu />}
        onClick={openSidebar}
        isHighlighted={false}
      />
    </div>
  );
};

/**
 * Header component for the top menu view
 * Shows custom template or default Krones logo
 */
function TopMenuHeader(props: {
  template: KMegaMenuProps['topMenuHeader'];
  onClose: () => void;
}) {
  const { template, onClose } = props;

  const content = template ?? (
    <h2 className="kro-knavitem-colors main-logo">
      <KronesLogo />
    </h2>
  );

  return <div onClick={onClose}>{content}</div>;
}

/**
 * Header component for submenu view
 * Shows back button and submenu label
 */
function SubmenuHeader(props: { label: string; onBackToTopMenu: () => void }) {
  const { label, onBackToTopMenu } = props;

  return (
    <div
      className="kro-menu-sidebar-header-start kro-knavitem-colors"
      onClick={onBackToTopMenu}
    >
      <BackArrow />
      <span>{label}</span>
    </div>
  );
}
