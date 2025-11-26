import { addCustomItemTemplating } from './mobile-common';
import { MenuItem, MenuItemCommandEvent } from 'primereact/menuitem';
import { Dispatch, SetStateAction } from 'react';
import { isSimpleItem } from '../comp-common';
import { KMegaMenuProps } from '../types';

/**
 * Builds the menu model for top menu view (main menu).
 * Processes menu items to remove children and attach navigation commands.
 *
 * @param params
 * @returns Processed menu model with custom templates and commands
 */
export function buildTopMenuModel(
  params: {
    closeSideBar: () => void;
    selectSubmenu: Dispatch<SetStateAction<string | null>>;
  } & Pick<KMegaMenuProps, 'model' | 'activeId'>
) {
  const { model, closeSideBar, selectSubmenu, activeId } = params;

  const modelWithCommands = attachNavigationCommandsToTopMenu({
    model,
    selectSubmenu,
    closeSideBar,
  });

  return addCustomItemTemplating({
    model: modelWithCommands,
    isTopMenuView: true,
    activeId,
  });
}

/**
 * Processes top menu items to attach navigation commands.
 * For items with children, command navigates to submenu.
 * For simple items, command closes sidebar and executes item command.
 *
 * @param props
 * @returns Processed menu items with attached commands (children removed)
 */
function attachNavigationCommandsToTopMenu(props: {
  model: MenuItem[] | undefined;
  selectSubmenu: Dispatch<SetStateAction<string | null>>;
  closeSideBar: () => void;
}): MenuItem[] | undefined {
  const { model, selectSubmenu, closeSideBar } = props;

  return model?.map((item) => {
    // Remove children items from top menu display
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { items, ...itemWithoutChildren } = item;

    return {
      ...itemWithoutChildren,
      command: (event: MenuItemCommandEvent) => {
        // Navigate to submenu for items with children
        if (!isSimpleItem(item)) {
          selectSubmenu(() => event.item.id ?? null);
          return;
        }

        // Close sidebar and execute command for simple items
        closeSideBar();
        item.command?.(event);
      },
    };
  });
}
