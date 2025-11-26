import { MutableRefObject, RefObject, useRef } from 'react';
import { KNavItem } from '../../knavitem';
import ArrowDown from '../../../svg-workaround/ArrowDown';
import { isSimpleItem } from '../comp-common';
import { useClickOutside, useEscapeKey } from './hooks/useClickOutside';
import { MenuItem } from 'primereact/menuitem';
import { MouseEvent } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';

/**
 * Props for the MenuButtonContainer component
 */
interface MenuButtonContainerProps {
  overlayPanelRef: MutableRefObject<OverlayPanel | null>;
  model?: MenuItem[];
  selectedButtonId: string | null;
  onSelectButton: (buttonId?: string) => void;
  hideMenu: () => void;
  activeId?: string;
}

/**
 * Container component that renders the horizontal menu navigation buttons
 *
 * This component manages:
 * - Rendering the array of navigation buttons
 * - Click and hover interactions for each button
 * - Click-outside detection to close the overlay
 * - Escape key handling to close the overlay
 */
export function MenuButtonContainer(props: MenuButtonContainerProps) {
  const {
    overlayPanelRef,
    model,
    hideMenu,
    activeId,
    selectedButtonId,
    onSelectButton,
  } = props;

  const buttonContainerRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(overlayPanelRef, buttonContainerRef, hideMenu);

  useEscapeKey(hideMenu);

  const isOverlayVisible = () => overlayPanelRef.current?.isVisible() ?? false;

  const menuNavigationButtons = model?.map((buttonItem) => (
    <KNavItem
      key={buttonItem.id}
      icon={buttonItem.icon}
      iconEnd={!isSimpleItem(buttonItem) && <ArrowDown />}
      className={buttonItem.className}
      onClick={(event) =>
        handleButtonClick(buttonItem, event, {
          selectedButtonId,
          overlayPanelRef,
          buttonContainerRef,
          hideMenu,
          onSelectButton,
          isOverlayVisible,
        })
      }
      onMouseEnter={() =>
        handleButtonHover(buttonItem.id, isOverlayVisible, onSelectButton)
      }
      label={buttonItem.label}
      isHighlighted={
        selectedButtonId === buttonItem.id || buttonItem.id === activeId
      }
    />
  ));

  return (
    <div ref={buttonContainerRef} className="kro-d-kmegamenu">
      {menuNavigationButtons}
    </div>
  );
}

/**
 * Context object passed to button click handler
 */
interface ButtonClickContext {
  selectedButtonId: string | null;
  overlayPanelRef: MutableRefObject<OverlayPanel | null>;
  buttonContainerRef: RefObject<HTMLDivElement>;
  hideMenu: () => void;
  onSelectButton: (id?: string) => void;
  isOverlayVisible: () => boolean;
}

/**
 * Handles click events on menu navigation buttons
 *
 * This function manages three scenarios:
 * 1. If the button has a custom command, execute it and hide the menu
 * 2. If the button is already selected and overlay is visible, toggle it closed
 * 3. Otherwise, show the overlay and select this button
 *
 * @param buttonItem - The menu item that was clicked
 * @param event - React mouse event
 * @param context - Context object containing refs and callback functions
 */
export function handleButtonClick(
  buttonItem: MenuItem,
  event: MouseEvent,
  context: ButtonClickContext
) {
  if (buttonItem.command) {
    buttonItem.command({
      originalEvent: event,
      item: buttonItem,
    });
    context.hideMenu();
    return;
  }

  if (
    context.selectedButtonId === buttonItem.id &&
    context.isOverlayVisible()
  ) {
    context.hideMenu();
    return;
  }

  context.overlayPanelRef.current?.show(
    event,
    context.buttonContainerRef.current
  );
  context.onSelectButton(buttonItem.id);
}

/**
 * Handles mouse enter events on menu navigation buttons
 *
 * When hovering over a button while the overlay is already visible,
 * this switches the displayed content to the hovered button's menu
 *
 * @param buttonId - ID of the button being hovered
 * @param isOverlayVisible - Function to check if overlay is currently visible
 * @param onSelectButton - Callback to select a new button
 */
export function handleButtonHover(
  buttonId: string | undefined,
  isOverlayVisible: () => boolean,
  onSelectButton: (buttonId?: string) => void
) {
  if (isOverlayVisible()) {
    onSelectButton(buttonId);
  }
}
