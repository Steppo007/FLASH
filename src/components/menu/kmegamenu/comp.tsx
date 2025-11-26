import { KMegaMenuDesktopRef, KMegaMenuProps, KMegaMenuRef } from './types';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import { MenuItem, MenuItemCommandEvent } from 'primereact/menuitem';
import { KMegaMenuDesktop } from './desktop/comp-desktop';
import { extractPxValueFromString } from './utils';
import { MobileBurgerMenu } from './mobile/comp-mobile';

export const KMegaMenu = forwardRef<KMegaMenuRef, KMegaMenuProps>(
  (allProps, ref) => {
    const {
      linkPreventDefault = true,
      activeId,
      breakpoint,
      topMenuHeader,
      model: modelProp,
      className,
    } = allProps;
    const size = useWindowSize();

    const breakpointNumber = extractPxValueFromString(breakpoint);
    const isMobile = determineIsMobile(breakpointNumber, size.width ?? 0);

    const desktopMenuRef = useRef<KMegaMenuDesktopRef>(null);
    useImperativeHandle(
      ref,
      () => ({
        desktop: desktopMenuRef.current,
      }),
      [desktopMenuRef.current]
    );

    // processing the model both for desktop and mobile views
    const model = linkPreventDefault
      ? preventDefaultForLeafAnchors(modelProp)
      : modelProp;

    //validating the model
    const modelIsValid = validateIdPresence(model);

    if (size.width === null || isNaN(breakpointNumber)) {
      return <></>;
    }

    if (!modelIsValid) {
      console.log(
        '[KMegaMenu(dev)]: Please fill the ids in the model for the top level and leaf items; make sure no node is of type MenuItem[][]'
      );
      return (
        <div style={{ backgroundColor: 'var(--surface-critical-accented)' }}>
          Validation error: please look at the logs
        </div>
      );
    }

    return (
      <div className={className}>
        {!isMobile ? (
          <KMegaMenuDesktop ref={desktopMenuRef} {...allProps} model={model} />
        ) : (
          <MobileBurgerMenu
            model={model}
            activeId={activeId}
            topMenuHeader={topMenuHeader}
            onOpenChange={allProps.onOpenChange}
          />
        )}
      </div>
    );
  }
);

KMegaMenu.displayName = 'KMegaMenu';

function preventDefaultForLeafAnchors(
  model: MenuItem[] | undefined
): MenuItem[] | undefined {
  return model?.map((item) => {
    if (Array.isArray(item.items)) {
      return {
        ...item,
        items: preventDefaultForLeafAnchors(item.items as MenuItem[]),
      };
    }

    const command = item?.command?.bind({});
    return {
      ...item,
      command: (event: MenuItemCommandEvent) => {
        event.originalEvent.preventDefault();
        command?.(event);
      },
    };
  });
}

function validateIdPresence(model: MenuItem[] | undefined): boolean {
  const topLevelHasId = model?.every((item) => !!item.id) || true;

  function recursiveCheckLeaf(
    model: MenuItem[] | undefined,
    result: boolean
  ): boolean {
    for (const item of model ?? []) {
      if (!result) break;
      if (Array.isArray(item.items)) {
        return recursiveCheckLeaf(item.items as MenuItem[], result);
      }

      if (!item.id) return false;
    }

    return true;
  }

  return topLevelHasId && recursiveCheckLeaf(model, true);
}

function determineIsMobile(breakpoint: number, width: number) {
  return width <= breakpoint;
}
