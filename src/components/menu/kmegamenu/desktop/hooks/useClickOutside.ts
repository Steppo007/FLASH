import { useEffect, RefObject } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';

/**
 * Hook to detect clicks outside the overlay panel and button array container
 *
 * @param overlayPanelRef - reference to the overlay panel
 * @param buttonContainerRef - reference to the button array container
 * @param callback - Function to call when click occurs outside all refs
 */
export function useClickOutside(
  overlayPanelRef: RefObject<OverlayPanel | null>,
  buttonContainerRef: RefObject<HTMLElement | null>,
  callback: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Check if the click is inside the overlay panel OR the button container
      const overlayElement = overlayPanelRef.current?.getElement();
      const isClickInOverlay =
        overlayElement && overlayElement.contains(event.target as Node);
      const isClickInButtons =
        buttonContainerRef.current &&
        buttonContainerRef.current.contains(event.target as Node);

      // Only hide if click is outside both elements
      if (!isClickInOverlay && !isClickInButtons) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [overlayPanelRef, buttonContainerRef, callback]);
}

/**
 * Hook to detect Escape key press
 *
 * @param callback - Function to call when Escape key is pressed
 */
export function useEscapeKey(callback: () => void) {
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        callback();
      }
    }

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [callback]);
}
