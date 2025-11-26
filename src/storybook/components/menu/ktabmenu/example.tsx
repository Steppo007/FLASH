// these svg imports work with vite and vite-plugin-svgr
import AccountFigure from '@root/assets/svgs/icons/accountFigure.svg?react';
import LanguageGlobe from '@root/assets/svgs/icons/languageGlobe.svg?react';
import ThemePalette from '@root/assets/svgs/icons/themePalette.svg?react';
import { MenuItem } from 'primereact/menuitem';
import { KBadge } from '@root/src/components/misc/kbadge';
import { useState } from 'react';
import { KTabMenu } from '@root/src/components/menu/ktabmenu';
import { ExampleWrapper } from '@root/src/storybook/utils';

export const model: MenuItem[] = [
  {
    label: 'Account',
    icon: <AccountFigure />,
    id: 'account',
    data: {
      badge: <KBadge label="1" severity="danger" size="small" />,
    },
  },
  {
    label: 'Theme',
    icon: <ThemePalette />,
    id: 'theme',
  },
  {
    label: 'Language',
    icon: <LanguageGlobe />,
    id: 'language',
    disabled: true,
  },
];

export default function Example() {
  const [activeId, setActiveId] = useState('');
  return (
    <ExampleWrapper className="flex justify-center">
      <KTabMenu
        model={model}
        activeIndex={model.findIndex((x) => x.id === activeId)}
        onTabChange={(e) => {
          setActiveId(e.value.id ?? '');
        }}
        size="default"
        className="w-full"
      />
    </ExampleWrapper>
  );
}
