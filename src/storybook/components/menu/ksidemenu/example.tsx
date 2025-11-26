// these svg imports work with vite and vite-plugin-svgr
import AccountFigure from '@root/assets/svgs/icons/accountFigure.svg?react';
import LanguageGlobe from '@root/assets/svgs/icons/languageGlobe.svg?react';
import ThemePalette from '@root/assets/svgs/icons/themePalette.svg?react';
import MailOutline from '@root/assets/svgs/icons/mailOutline.svg?react';
import NotificationBell from '@root/assets/svgs/icons/notificationBell.svg?react';
import { KSideMenu } from '@root/src/components/menu/ksidemenu';
import { MenuItem } from 'primereact/menuitem';
import { useState } from 'react';
import { KText } from '@root/src/components/misc/ktext';
import { ExampleWrapper } from '@sbook/utils';

export const model: MenuItem[] = [
  {
    label: 'Account',
    icon: <AccountFigure />,
    id: 'account',
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
  },
  {
    label: 'Contact',
    icon: <MailOutline />,
    id: 'contact',
  },
  {
    label: 'Notifications',
    icon: <NotificationBell />,
    id: 'notification',
  },
];

export default function Example() {
  const [activeId, setActiveId] = useState('');
  return (
    <ExampleWrapper className="flex justify-center gap-4">
      <div className="bg-surface-sidebar p-2">
        <KSideMenu
          model={model}
          activeIndex={model.findIndex((x) => x.id === activeId)}
          onTabChange={(e) => {
            setActiveId(e.value.id ?? '');
          }}
        />
      </div>
      <div className="border-content-bodytext flex w-52 items-center justify-center border p-1">
        <KText type="text" className="text-center">
          Active id: <br></br>
          {activeId}
        </KText>
      </div>
    </ExampleWrapper>
  );
}
