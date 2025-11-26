import { Menu, MenuPassThroughOptions } from 'primereact/menu';
import { KMenuProps } from '.';
import { forwardRef } from 'react';

function getKMenuPTOptions(): MenuPassThroughOptions {
  return {
    root: { className: 'kro-kmenu' },
    submenuHeader: {
      className: 'kro-line-clamp-1',
    },
    label: { className: 'kro-line-clamp-2' },
  };
}

export const KMenu = forwardRef<Menu, KMenuProps>((props, ref) => {
  return <Menu {...props} pt={getKMenuPTOptions()} ref={ref} />;
});

KMenu.displayName = 'KMenu';
