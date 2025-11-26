import { MenuItem, MenuItemCommandEvent } from 'primereact/menuitem';
import { isTabbedMenuItem } from '../comp-common';
import { useEffect, useState } from 'react';
import { addCustomItemTemplating } from './mobile-common';
import {
  KActionSelector,
  KActionSelectorProps,
} from '../../../form/kactionselector';
import { KMegaMenuProps } from '../types';

/**
 * Custom hook to manage tabbed menu state for mobile navigation.
 * Handles category selection and provides an action selector component.
 *
 * @param menu - The menu item that may contain tabbed categories
 * @param closeSideBar - Callback to close the sidebar
 * @returns Object containing tabbed status, selected category ID, and action selector component
 */
export function useTabbedMenu(
  menu: MenuItem | undefined,
  closeSideBar: () => void
) {
  const [currentTabbedCategoryId, setCurrentTabbedCategoryId] =
    useState<string>('');
  const isTabbedItem = isTabbedMenuItem(menu);

  // Initialize with the first category ID when menu changes
  useEffect(() => {
    if (isTabbedItem && menu?.items?.[0]?.id) {
      setCurrentTabbedCategoryId(menu.items[0].id);
    }
  }, [menu, isTabbedItem]);

  // Return early for non-tabbed menu items
  if (!isTabbedItem) {
    return {
      isTabbedItem: false,
    } as const;
  }

  const actionSelector = ActionSelector({
    menu,
    value: currentTabbedCategoryId,
    onSelectValue: setCurrentTabbedCategoryId,
    onButtonPressed: closeSideBar,
    className: 'kro-menu-sidebar-action-selector',
    buttonLabel: menu?.data?.ktabbed?.categoryLinkLabel,
    overlayHint: menu?.data?.ktabbed?.categorySelectorHintMobile,
    overlayHeader: menu?.data?.ktabbed?.categorySelectorHeaderMobile,
    label: menu?.data?.ktabbed?.categoryControlLabelMobile,
  });

  return {
    isTabbedItem: true,
    currentTabbedCategoryId: currentTabbedCategoryId,
    actionSelector,
  } as const;
}

/**
 * Builds the menu model for item menu view (submenu content).
 * Processes menu items to attach close commands and applies custom templates.
 *
 * @param params
 * @returns Processed menu model with custom templates and commands
 */
export function buildItemMenuModel(
  params: {
    closeSideBar: () => void;
    itemTabbedStatusState: Pick<
      ReturnType<typeof useTabbedMenu>,
      'isTabbedItem' | 'currentTabbedCategoryId'
    >;
  } & Pick<KMegaMenuProps, 'model' | 'activeId'>
) {
  const modelWithCommand = editCommandForItemMenu({
    ...params,
    model: params.model,
  });

  return addCustomItemTemplating({
    model: modelWithCommand,
    isTopMenuView: false,
    activeId: params.activeId,
  });
}

/**
 * Recursively processes menu items to attach close sidebar command.
 * For tabbed menus, filters items to show only the selected category.
 *
 * @param props - Menu model and processing configuration
 * @returns Processed menu items with attached commands
 */
function editCommandForItemMenu(
  props: {
    model: MenuItem[] | undefined;
  } & Omit<Parameters<typeof buildItemMenuModel>[0], 'model'>
): MenuItem[] | undefined {
  const { model: paramModel, closeSideBar, itemTabbedStatusState } = props;

  let model = paramModel;

  // Filter to show only the selected category for tabbed menus
  if (
    itemTabbedStatusState.isTabbedItem &&
    itemTabbedStatusState.currentTabbedCategoryId?.trim() !== ''
  ) {
    const selectedCategory = paramModel?.find(
      (category) =>
        category.id === itemTabbedStatusState.currentTabbedCategoryId
    );
    model = selectedCategory?.items as MenuItem[] | undefined;
  }

  return model?.map((item): MenuItem => {
    if (Array.isArray(item.items)) {
      return {
        ...item,
        items: editCommandForItemMenu({
          model: item.items as MenuItem[],
          closeSideBar,
          // Disable category filtering for nested items
          itemTabbedStatusState: {
            ...itemTabbedStatusState,
            isTabbedItem: false,
          },
        }),
      };
    }

    // Attach close sidebar command to leaf menu items
    return {
      ...item,
      command: (event: MenuItemCommandEvent) => {
        closeSideBar();
        item.command?.(event);
      },
    };
  });
}

/**
 * Action selector component for navigating between tabbed categories.
 *
 * @param props
 * @returns KActionSelector component
 */
function ActionSelector(
  props: {
    menu: MenuItem;
    onButtonPressed: () => void;
  } & Omit<KActionSelectorProps, 'options' | 'buttonUrl' | 'noBoundaryStyling'>
) {
  const { menu, ...restProps } = props;

  // Build category options from menu items
  const options =
    (menu.items as MenuItem[] | undefined)?.map((category) => ({
      label: category.label ?? '',
      value: category.id ?? '',
    })) ?? [];

  // Find the currently selected category
  const currentCategory = (menu.items as MenuItem[] | undefined)?.find(
    (category) => category.id === props.value
  );

  return (
    <KActionSelector
      {...restProps}
      options={options}
      buttonUrl={currentCategory?.url ?? '#'}
      noBoundaryStyling={true}
      buttonDisabled={currentCategory?.disabled}
      buttonCommand={(event) => {
        props.onButtonPressed();
        currentCategory?.command?.({
          item: currentCategory,
          originalEvent: event,
        });
      }}
    />
  );
}
