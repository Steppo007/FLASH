import { TabbedMenuItem, KMegaMenuProps } from '../types';
import { MenuItem } from 'primereact/menuitem';
import KText from '../../../misc/ktext';
import { KLinkButton } from '../../../button/klinkbutton';
import { CSSProperties, Dispatch, SetStateAction, useState } from 'react';
import { classNames } from 'primereact/utils';
import { ColumnGrid, renderCategoryItems } from './comp-desktop-common';
import { KSelectButton } from '../../../form/kselectbutton';
import { SelectItemOptionsType } from 'primereact/selectitem';

export const TabbedContent = (
  props: Pick<KMegaMenuProps, 'activeId'> & {
    menuModel: TabbedMenuItem | undefined;
    hideMenu: () => void;
  }
) => {
  const { menuModel } = props;
  const [currentCategoryId, setCurrentCategoryId] = useState<string>(
    menuModel?.items?.[0]?.id || ''
  );

  if (!menuModel?.items?.length) {
    return <div></div>;
  }

  const chosenModel =
    menuModel.items.find((item) => item.id === currentCategoryId) ?? menuModel;

  const areItemsCategorized = chosenModel?.items?.some(
    (item: MenuItem) => item?.items != null
  );

  return (
    <div className="kro-d-megamenu-panel-tabbed-content">
      <Controls
        hideMenu={props.hideMenu}
        menuModel={menuModel}
        currentCategoryState={[currentCategoryId, setCurrentCategoryId]}
      />
      {areItemsCategorized ? (
        <ColumnGrid {...props} menuModel={chosenModel} />
      ) : (
        <ItemGrid {...props} currentCategoryId={currentCategoryId} />
      )}
    </div>
  );
};

const ItemGrid = (
  props: Parameters<typeof TabbedContent>[0] & {
    currentCategoryId: string;
  }
) => {
  const { activeId, hideMenu, menuModel, currentCategoryId } = props;

  const currentCategoryItems = menuModel?.items?.find(
    (it: MenuItem) => it.id === currentCategoryId
  )?.items as MenuItem[] | undefined;

  if (!currentCategoryItems) {
    return <></>;
  }

  return (
    <div className={classNames('category-item-grid', menuModel?.className)}>
      {renderCategoryItems({ items: currentCategoryItems, activeId, hideMenu })}
    </div>
  );
};

const Controls = (props: {
  menuModel: TabbedMenuItem;
  currentCategoryState: [string, Dispatch<SetStateAction<string>>];
  hideMenu: () => void;
}) => {
  const { menuModel, hideMenu, currentCategoryState } = props;
  const [currentCategoryId] = currentCategoryState;

  const categoryList =
    menuModel.items?.map((item: MenuItem) => ({
      value: item.id ?? '',
      label: item.label,
      icon: item.icon,
    })) ?? [];

  const currentCategory = menuModel.items?.find(
    (it: MenuItem) => it.id === currentCategoryId
  );

  const noWrapStyle: CSSProperties = { textWrap: 'nowrap' };

  return (
    <div className="control-panel">
      <div className="control-panel-left">
        <KText type="h4" style={noWrapStyle}>
          {menuModel.data.ktabbed.categoryControlLabel}
        </KText>
        <KLinkButton
          label={menuModel.data.ktabbed.categoryLinkLabel}
          disabled={false}
          showArrow={true}
          style={noWrapStyle}
          className={classNames({
            'is-disabled': currentCategory?.disabled,
          })}
          onClick={(event) => {
            if (currentCategory?.command) {
              currentCategory.command({
                originalEvent: event,
                item: currentCategory,
              });
            }
            hideMenu();
          }}
        />
      </div>

      <CategorySelector
        categoryList={categoryList}
        currentCategoryState={currentCategoryState}
      />
    </div>
  );
};

const CategorySelector = (props: {
  categoryList: SelectItemOptionsType;
  currentCategoryState: [string, Dispatch<SetStateAction<string>>];
}) => {
  const { categoryList, currentCategoryState } = props;
  const [currentCategoryId, setCurrentCategoryId] = currentCategoryState;

  if (!categoryList?.length || categoryList.length < 2) {
    return <></>;
  }

  return (
    <KSelectButton
      style={{ textWrap: 'nowrap' }}
      allowEmpty={false}
      value={currentCategoryId}
      onChange={(e) => setCurrentCategoryId(e.value)}
      options={categoryList}
    />
  );
};
