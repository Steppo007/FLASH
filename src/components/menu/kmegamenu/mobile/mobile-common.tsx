import { MenuItem } from 'primereact/menuitem';
import { MouseEventHandler } from 'react';
import { classNames } from 'primereact/utils';
import ArrowRight from '../../../svg-workaround/ArrowRight';

/**
 * Recursively applies custom item templates to menu items.
 *
 * @param props
 * @returns Menu model with custom templates applied
 */
export function addCustomItemTemplating(props: {
  model: MenuItem[] | undefined;
  isTopMenuView: boolean;
  activeId?: string;
}): MenuItem[] | undefined {
  const { model, isTopMenuView, activeId } = props;

  return model?.map((item): MenuItem => {
    // Recursively process nested menu items
    if (Array.isArray(item.items)) {
      return {
        ...item,
        items: addCustomItemTemplating({
          model: item.items as MenuItem[],
          isTopMenuView: isTopMenuView,
          activeId: activeId,
        }),
      };
    }

    // Apply custom template to leaf menu items
    return {
      ...item,
      template: (item: MenuItem, options) => {
        const onClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
          options.onClick(event);
        };
        return (
          <MobileMenuItem
            item={item}
            onClick={onClick}
            isMobileStartView={isTopMenuView}
            isActive={!!item?.id && item?.id === activeId}
          />
        );
      },
    };
  });
}

/**
 * Renders a mobile menu item with custom styling and layout.
 * Displays icon, label, and navigation arrow based on view type and active state.
 *
 * @param props
 * @returns Styled anchor element representing the menu item
 */
function MobileMenuItem(props: {
  item: MenuItem;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  isMobileStartView: boolean;
  isActive: boolean;
}) {
  const { item, onClick, isMobileStartView, isActive } = props;

  return (
    <a
      href={item.url || '#'}
      onClick={onClick}
      data-pc-section="content"
      className={classNames(
        'kro-knavitem-colors kro-menu-sidebar-content-menu-content',
        {
          'kro-menu-sidebar-top-view': isMobileStartView,
          'kro-menu-sidebar-inner-view': !isMobileStartView,
          'is-highlighted': isActive,
          'is-disabled': item.disabled,
        }
      )}
    >
      <div className="kro-menu-sidebar-content-menu-content-left">
        {item.icon}
        <span className="" data-pc-section="label">
          {item.label}
        </span>
      </div>
      <div className="kro-menu-sidebar-content-menu-content-right">
        <ArrowRight />
      </div>
    </a>
  );
}
