// these svg imports work with vite and vite-plugin-svgr
import AccountFigure from '@root/assets/svgs/icons/accountFigure.svg?react';
import LanguageGlobe from '@root/assets/svgs/icons/languageGlobe.svg?react';
import ThemePalette from '@root/assets/svgs/icons/themePalette.svg?react';
import MailOutline from '@root/assets/svgs/icons/mailOutline.svg?react';
import NotificationBell from '@root/assets/svgs/icons/notificationBell.svg?react';

import { KButton } from '@root/src/components/button/kbutton';
import {
  KMultiPageDialog,
  KDialogPage,
} from '@root/src/components/overlay/kmultipagedialog';
import { useState } from 'react';
import { KText } from '@root/src/components/misc/ktext';
import { ExampleWrapper } from '@sbook/utils';

const ContentPage = (props: { pageId: string }) => {
  return (
    <div className="flex h-full items-center justify-center p-12 text-center">
      <KText type="text">
        Add content here for page with id: <br></br>
        {props.pageId}
      </KText>
    </div>
  );
};

export const model: KDialogPage[] = [
  {
    label: 'Account',
    icon: <AccountFigure />,
    id: 'account',
    content: <ContentPage pageId="account" />,
  },
  {
    label: 'Theme',
    icon: <ThemePalette />,
    id: 'theme',
    content: <ContentPage pageId="theme" />,
  },
  {
    label: 'Language',
    icon: <LanguageGlobe />,
    id: 'language',
    content: <ContentPage pageId="language" />,
  },
  {
    label: 'Contact',
    icon: <MailOutline />,
    id: 'contact',
    content: <ContentPage pageId="contact" />,
  },
  {
    label: 'Notifications',
    icon: <NotificationBell />,
    id: 'notifications',
    content: <ContentPage pageId="notifications" />,
  },
];

export default function ExampleBasic() {
  const [isVisible, setIsVisible] = useState(false);
  const showDialog = () => {
    setIsVisible(true);
  };
  const hideDialog = () => {
    setIsVisible(false);
  };

  return (
    <ExampleWrapper className="flex items-center justify-center">
      <KButton label="Show Dialog" onClick={showDialog} />
      <KMultiPageDialog
        visible={isVisible}
        model={model}
        onHide={hideDialog}
        header={'Settings'}
        footer={
          <>
            <KButton label="Primary Action" />
            <KButton label="Secondary Action" variant="outlined" />
          </>
        }
      />
    </ExampleWrapper>
  );
}
