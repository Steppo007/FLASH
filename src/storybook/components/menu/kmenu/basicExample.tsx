import { KMenu } from '@complib/menu/kmenu';
import { ExampleWrapper } from '@sbook/utils';
import { MenuItem } from 'primereact/menuitem';
import PlusSign from '@root/assets/svgs/icons/plusSign.svg?react';
import InfoOutlined from '@root/assets/svgs/icons/infoOutlined.svg?react';
import OutlinedSettingsGear from '@root/assets/svgs/icons/outlinedSettingsGear.svg?react';
import LogoutArrow from '@root/assets/svgs/icons/logoutArrow.svg?react';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { KToast } from '@root/src/components/message/ktoast';

export default function BasicExample() {
  const toastRef = useRef<Toast>(null);

  const showToastMessage = (text: string) => {
    toastRef.current?.show({
      severity: 'success',
      summary: 'Menu Item Clicked',
      detail: text,
      sticky: true,
    });
  };

  const model: MenuItem[] = [
    {
      label: 'Documents',
      items: [
        {
          label: 'New',
          icon: <PlusSign />,
          command: () => {
            showToastMessage('New document requested.');
          },
        },
        {
          label: 'Info',
          icon: <InfoOutlined />,
          command: () => {
            showToastMessage('Info requested.');
          },
        },
      ],
    },
    {
      label: 'Profile',
      items: [
        {
          label: 'Settings',
          icon: <OutlinedSettingsGear />,
          command: () => {
            showToastMessage('Settings requested.');
          },
        },
        {
          label: 'Logout',
          icon: <LogoutArrow />,
          command: () => {
            showToastMessage('Logout requested.');
          },
        },
      ],
    },
  ];

  return (
    <ExampleWrapper className="relative flex min-w-96 items-center justify-center">
      <KMenu model={model} className="min-w-36" />
      <KToast position="top-right" ref={toastRef} className="!absolute" />
    </ExampleWrapper>
  );
}
