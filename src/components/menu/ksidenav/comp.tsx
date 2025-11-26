import { KSideNavProps } from './types';
import { useEffect, useMemo, useState } from 'react';
import { classNames } from 'primereact/utils';
import KSideNavPanelMenu from '../ksidenavpanelmenu';
import KSidebar from '../../overlay/ksidebar';
import KSideNavTieredMenu from '../ksidenavtieredmenu';
import { KInteractiveIcon } from '../../misc/kinteractiveicon';
import { MenuItem } from 'primereact/menuitem';
import {
  copyIdToKeyField,
  enrichModelWithClassName,
  enrichModelWithCommand,
  hasSubItems,
} from '../../utils/menuModelProcessing';

export function KSideNav(props: KSideNavProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState<Record<string, boolean>>();

  const expand = () => {
    setIsExpanded(true);
  };

  const contract = () => {
    setIsExpanded(false);
  };

  const transformedModel = useMemo(() => {
    const isNavItemActive = (item: MenuItem) => {
      if (item.id === props.currentPage) return true;
      if (!item.items) return false;
      return item.items.some(isNavItemActive);
    };

    const modelWithKeys = copyIdToKeyField(props.navigationModel);

    const modelWithPageChangeCommand = enrichModelWithCommand(
      modelWithKeys,
      (item: MenuItem) => {
        if (!hasSubItems(item)) {
          contract();
          props.onPageChange?.(item.id ?? '');
        }
      }
    );

    const modelWithActiveClassName = enrichModelWithClassName(
      modelWithPageChangeCommand,
      isNavItemActive,
      'kro-active'
    );

    return modelWithActiveClassName ?? [];
  }, [props.navigationModel, props.currentPage]);

  useEffect(() => {
    const expandedKey = props.navigationModel.find(
      (item) =>
        item.id === props.currentPage ||
        item.items?.some(
          (subItem: MenuItem) => subItem.id === props.currentPage
        )
    )?.id;
    setExpandedKeys(expandedKey ? { [expandedKey]: true } : {});
  }, [props.currentPage, props.navigationModel]);

  const ProductTitle = (props: { title?: string }) => {
    return <div className="kro-ksidenav-product-title">{props.title}</div>;
  };

  const tieredMenu = (
    <>
      <div onClick={expand} className="kro-ksidenav-double-arrow">
        <KInteractiveIcon icon={<DoubleArrow />} size="small" />
      </div>
      <ProductTitle title={undefined} />
      <KSideNavTieredMenu model={transformedModel} />
    </>
  );

  const panelMenu = (
    <>
      <ProductTitle title={props.productTitle} />
      <KSideNavPanelMenu
        expandedKeys={expandedKeys}
        onExpandedKeysChange={setExpandedKeys}
        model={transformedModel}
      />
    </>
  );

  return (
    <div className={classNames('kro-ksidenav')}>
      {tieredMenu}
      <KSidebar
        visible={isExpanded}
        onHide={contract}
        appendTo={props.sideBarAnchor}
      >
        {panelMenu}
      </KSidebar>
    </div>
  );
}

export const DoubleArrow = () => (
  <svg
    className="kro-double-arrow"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="double-arrow">
      <path id="Vector" d="M4.25 9.5H6.5L4 6L6.5 2.5H4.25L1.75 6L4.25 9.5Z" />
      <path id="Vector_2" d="M7.75 9.5H10L7.5 6L10 2.5H7.75L5.25 6L7.75 9.5Z" />
    </g>
  </svg>
);
