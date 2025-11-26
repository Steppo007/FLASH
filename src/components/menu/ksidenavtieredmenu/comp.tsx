import { TieredMenu } from 'primereact/tieredmenu';
import { KSideNavTieredMenuProps } from './types';
import { classNames } from 'primereact/utils';
import { createRef, RefObject, useMemo } from 'react';
import { hasSubItems, KeyedMenuItem } from '../../utils/menuModelProcessing';
import { MenuItem } from 'primereact/menuitem';
import { KTooltip } from '../../overlay/ktooltip';

interface TooltipRef {
  item: KeyedMenuItem;
  anchorElementRef: RefObject<HTMLAnchorElement>;
}

export function KSideNavTieredMenu({
  className,
  model,
  ...props
}: KSideNavTieredMenuProps) {
  const cn = classNames(className, 'kro-ksidenavtieredmenu');

  const tooltipRefs = useMemo<TooltipRef[]>(
    () =>
      model.map((item: KeyedMenuItem) => ({
        item,
        anchorElementRef: createRef<HTMLAnchorElement>(),
      })),
    [model]
  );

  const modelWithTemplates = useMemo(() => {
    return enrichModelWithTemplates(model, tooltipRefs);
  }, [model, tooltipRefs]);

  return <TieredMenu className={cn} model={modelWithTemplates} {...props} />;
}

/**
 * Provides a template which renders the root level with just an icon.
 * Also, adds the root-level label as the first subitem in the second level.
 */
function enrichModelWithTemplates(
  items: KeyedMenuItem[],
  tooltipRefs: TooltipRef[]
): KeyedMenuItem[] {
  // template may cause issue with keyboard navigation
  const itemTemplate = (item: MenuItem) => {
    const ref = tooltipRefs.find(
      (x) => x.item.id === item.id
    )?.anchorElementRef;
    return (
      <>
        <a ref={ref} href={item.url ?? '#'} data-pc-section="action">
          <span>{item.icon}</span>
          {hasSubItems(item) && <div className="bottom-right-arrow"></div>}
        </a>
        <KTooltip
          target={ref}
          content={item.label}
          position="right"
          showDelay={600}
        />
      </>
    );
  };

  return items.map((item: KeyedMenuItem) => ({
    ...item,
    template: itemTemplate,
    items: hasSubItems(item)
      ? [
          {
            label: item.label,
            disabled: true,
          },
          ...(item.items as KeyedMenuItem[]),
        ]
      : undefined,
  }));
}
