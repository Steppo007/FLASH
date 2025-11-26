import { SetStateAction, useState } from 'react';

/**
 * Custom hook to manage navigation state between top menu and submenus
 * Keeps the last selected submenu ID for smooth transitions
 */
export function useMenuNavigationState() {
  const [isTopMenuVisible, setIsTopMenuVisible] = useState<boolean>(true);
  const [currentSubmenuId, setCurrentSubmenuId] = useState<string | null>(null);

  const navigateToSubmenu = (value: SetStateAction<string | null>) => {
    setIsTopMenuVisible(false);
    setCurrentSubmenuId(value);
  };

  const navigateToTopMenu = () => {
    setIsTopMenuVisible(true);
    // Keep currentSubmenuId for smooth transition animation
  };

  return {
    isTopMenuVisible,
    currentSubmenuId,
    navigateToSubmenu,
    navigateToTopMenu,
  };
}
