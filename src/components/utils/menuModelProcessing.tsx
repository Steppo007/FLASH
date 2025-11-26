import {
  MenuItem,
  MenuItemCommandEvent,
  MenuItemOptions,
} from 'primereact/menuitem';
import { classNames } from 'primereact/utils';

export interface KeyedMenuItem extends MenuItem {
  /**
   * Key of then MenuItem
   */
  key?: string;
  /**
   * Subitems of the item
   */
  items?: KeyedMenuItem[];
}

function enrichModel<K extends keyof KeyedMenuItem, V extends KeyedMenuItem[K]>(
  model: KeyedMenuItem[] | undefined,
  key: K,
  valueCallback: (item: KeyedMenuItem) => V
): KeyedMenuItem[] | undefined {
  return model?.map((item) => ({
    ...item,
    [key]: valueCallback(item),
    items: enrichModel<K, V>(item.items, key, valueCallback),
  }));
}

/**
 * Enriches a model with (a) classname(s) for each item and subitem based on a given condition
 * @param model Model of the menu as an array of items
 * @param condition The condition whether the classname should be added to a specific item
 * @param className The classname that should be added to the item
 * @returns The enriched model
 */
export function enrichModelWithClassName(
  model: KeyedMenuItem[] | undefined,
  condition: (item: MenuItem) => boolean,
  className: string
): KeyedMenuItem[] | undefined {
  return enrichModel<'className', string | undefined>(
    model,
    'className',
    (item) =>
      classNames(item.className, {
        [className]: condition?.(item),
      })
  );
}

/**
 * Copies the id field to a possibly new field called 'key'
 * @param model Model of the menu as an array of items
 * @returns The enriched model
 */
export function copyIdToKeyField(model: KeyedMenuItem[] | undefined) {
  return enrichModel(model, 'key', (item) => item.id);
}

/**
 * Enriches the command of each item from a menu model with a new function call
 * @param model Model of the menu as an array of items
 * @param command The added command as a function
 * @returns The enriched model
 */
export function enrichModelWithCommand(
  model: KeyedMenuItem[] | undefined,
  command: (item: MenuItem) => void
): KeyedMenuItem[] | undefined {
  return enrichModel(model, 'command', (item: KeyedMenuItem) => {
    return (e: MenuItemCommandEvent) => {
      item.command?.(e);
      command(item);
    };
  });
}

/**
 * Enriches each item of a menu model with a template based on a condition
 * @param model Model of the menu as an array of items
 * @param condition The condition whether the template should be set for a specific item
 * @param template The template that should be set for an item
 * @returns The enriched model
 */
export function enrichModelWithTemplate(
  model: KeyedMenuItem[] | undefined,
  condition: (item: MenuItem) => boolean,
  template: (item: MenuItem, options: MenuItemOptions) => React.ReactNode
): KeyedMenuItem[] | undefined {
  return enrichModel(model, 'template', (item: MenuItem) =>
    condition(item) ? template : undefined
  );
}

/**
 * Determines whether a MenuItem has subitem
 * @param item The MenuItem
 * @returns True, if the MenuItem has subitems; false otherwise
 */
export function hasSubItems(item: MenuItem) {
  return item.items && item.items.length > 0;
}
