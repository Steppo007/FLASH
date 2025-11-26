import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import {
  KMegaMenuProps,
  KMegaMenuCallbacks,
  KMegaMenuDesktopRef,
} from '../types';
import { OverlayPanel } from 'primereact/overlaypanel';
import { SimpleContent } from './desktop-simple-content';
import { TabbedContent } from './desktop-tabbed-content';
import { isTabbedMenuItem, isSimpleItem } from '../comp-common';
import { MenuButtonContainer } from './desktop-button-container';
import { getOverlayPTOptions } from './pt';

type KMegaMenuDesktopProps = Pick<
  KMegaMenuProps,
  'model' | 'activeId' | 'minColumnWidthDesktop' | 'maxColumnWidthDesktop'
> &
  KMegaMenuCallbacks;

/**
 * @remarks
 * This component handles:
 * - Overlay panel positioning and visibility management
 * - Mouse hover behavior and keyboard-mouse interaction to close the menu (MenuButtonContainer)
 */
export const KMegaMenuDesktop = forwardRef<
  KMegaMenuDesktopRef,
  KMegaMenuDesktopProps
>((allProps, ref) => {
  const model = allProps.model;
  const [currentTopMenuId, setCurrentTopMenuId] = useState<string | null>(null);
  const overlayPanelRef = useRef<OverlayPanel | null>(null);

  // Expose the overlayPanelRef via imperative handle
  useImperativeHandle(
    ref,
    () => ({
      overlayPanel: overlayPanelRef?.current,
    }),
    [overlayPanelRef.current]
  );

  const hideMenu = () => {
    overlayPanelRef.current?.hide();
  };

  const menuModel = model?.find((x) => !!x.id && x.id === currentTopMenuId);

  const isTabbedMenu = isTabbedMenuItem(menuModel);

  return (
    <div>
      <MenuButtonContainer
        overlayPanelRef={overlayPanelRef}
        selectedButtonId={currentTopMenuId}
        onSelectButton={(buttonId) => setCurrentTopMenuId(buttonId || null)}
        hideMenu={hideMenu}
        model={model}
        activeId={allProps.activeId}
      />

      <OverlayPanel
        ref={overlayPanelRef}
        pt={getOverlayPTOptions({
          isSimpleItemSelected: isSimpleItem(menuModel),
        })}
        onShow={() => allProps.onOpenChange?.(true)}
        onHide={() => {
          setCurrentTopMenuId(null);
          allProps.onOpenChange?.(false);
        }}
      >
        {isTabbedMenu ? (
          <TabbedContent
            {...allProps}
            menuModel={menuModel}
            hideMenu={hideMenu}
          />
        ) : (
          <SimpleContent
            {...allProps}
            menuModel={menuModel}
            hideMenu={hideMenu}
          />
        )}
      </OverlayPanel>
    </div>
  );
});

KMegaMenuDesktop.displayName = 'KMegaMenuDesktop';
