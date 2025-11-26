import { MenuItem } from 'primereact/menuitem';
import { classNames } from 'primereact/utils';
import { KMegaMenuProps } from '../types';

export function renderCategoryItems(props: {
  items: MenuItem[] | undefined;
  activeId?: string;
  hideMenu: () => void;
}) {
  const { items, activeId, hideMenu } = props;
  return items?.map((item, idx) => (
    <a
      key={item?.id || `item-${idx}`}
      href={item.url || '#'}
      className={classNames(
        'category-item kro-knavitem-colors',
        {
          'is-highlighted': item.id === activeId,
          'is-disabled': item.disabled,
        },
        item.className
      )}
      onClick={(event) => {
        if (item.command) {
          item.command({
            originalEvent: event,
            item: item,
          });
        }
        hideMenu();
      }}
    >
      {!!item.icon && ( // the anchor has a gap css attribute which distorts the alignment if just set display to none
        <div className="category-item-icon">{item.icon}</div>
      )}
      <span>{item.label}</span>
    </a>
  ));
}

export const ColumnGrid = (
  props: Pick<KMegaMenuProps, 'activeId'> & {
    menuModel: MenuItem | undefined;
    hideMenu: () => void;
  }
) => {
  const { menuModel, activeId, hideMenu } = props;

  const columns = (menuModel?.items as MenuItem[] | undefined)?.map(
    (category, idx) => {
      const items = renderCategoryItems({
        items: category.items as MenuItem[] | undefined,
        activeId,
        hideMenu,
      });

      return (
        <div
          key={category.id || `category-${idx}`}
          className="kro-d-megamenu-panel-hierarch-column"
        >
          <div className={classNames('column-header', category.className)}>
            {category.icon}
            <div>{category.label}</div>
          </div>
          {items}
        </div>
      );
    }
  );

  return <div className="kro-d-megamenu-panel-hierarch-content">{columns}</div>;
};
