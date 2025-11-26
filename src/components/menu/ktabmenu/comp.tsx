import { TabMenu } from 'primereact/tabmenu';
import { KTabMenuProps, getKTabMenuPTOptions } from '.';
import { useMemo } from 'react';
import {
  enrichModelWithTemplate,
  KeyedMenuItem,
} from '../../utils/menuModelProcessing';
import { MenuItem, MenuItemOptions } from 'primereact/menuitem';

/**
 * Returns a KTabMenu component.
 */
export const KTabMenu = ({
  size = 'default',
  model,
  ...props
}: KTabMenuProps) => {
  const newModel = useMemo(() => {
    if (!model) return model;
    const badgeTemplate: (
      item: MenuItem,
      options: MenuItemOptions
    ) => React.ReactNode = (item: MenuItem, menuOptions: MenuItemOptions) => (
      <>
        {menuOptions.element}
        {item.data.badge}
      </>
    );
    return enrichModelWithTemplate(
      model as KeyedMenuItem[],
      (item: MenuItem) => item.data?.badge,
      badgeTemplate
    );
  }, [model]);
  return (
    <TabMenu
      pt={getKTabMenuPTOptions({ size })}
      model={newModel}
      {...props}
      unstyled
    />
  );
};
