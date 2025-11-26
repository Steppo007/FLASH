import { ExampleWrapper } from '@sbook/utils';
import { KMegaMenu, KMegaMenuProps } from '@complib/menu/kmegamenu';
import { menuItems } from '@sbook/components/menu/kmegamenu/example-model';
import { useState } from 'react';
import KronesLogo from '@root/assets/svgs/other/kronesLogo.svg?react';
import { MenuItem } from 'primereact/menuitem';

export function ExampleMegaMenu(props?: Omit<KMegaMenuProps, 'model'>) {
  const [activeId, setActiveId] = useState(props?.activeId);
  const command: NonNullable<MenuItem['command']> = (item) => {
    if (!item.item.disabled) {
      setActiveId(item.item.id);
    }
  };
  const breakpoint = props?.breakpoint ?? '1024px';

  const topMenuHeader = (
    <h2
      data-testid="krones-logo"
      className="kro-knavitem-colors main-logo"
      onClick={() => setActiveId(undefined)}
    >
      <KronesLogo />
    </h2>
  );

  return (
    <ExampleWrapper className="wrapper flex justify-center">
      <KMegaMenu
        {...props}
        model={menuItems(command)}
        activeId={activeId}
        topMenuHeader={topMenuHeader}
        breakpoint={breakpoint}
      ></KMegaMenu>
    </ExampleWrapper>
  );
}
