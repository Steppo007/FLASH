import KMenu from '@root/src/components/menu/kmenu';
import { KInteractiveIcon } from '@root/src/components/misc/kinteractiveicon';
import { ExampleWrapper } from '@root/src/storybook/utils';
import { MenuItem } from 'primereact/menuitem';
import MarkUnread from '@root/assets/svgs/icons/markUnread.svg?react';
import Delete from '@root/assets/svgs/icons/delete.svg?react';
import Check from '@root/assets/svgs/icons/check.svg?react';
import DotsVertical from '@root/assets/svgs/icons/dotsVertical.svg?react';

import { useRef, useState } from 'react';
import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';
import { KToast } from '@root/src/components/message/ktoast';

export default function PopupExample() {
  const [isRead, setIsRead] = useState(false);
  const menuRef = useRef<Menu>(null);
  const toastRef = useRef<Toast>(null);

  const showDeleteMessage = () => {
    toastRef.current?.show({
      severity: 'success',
      summary: 'Item deleted.',
      detail: 'The item was successfully deleted.',
      sticky: true,
    });
  };

  const showMarkedReadMessage = (read: boolean) => {
    toastRef.current?.show({
      severity: 'success',
      summary: 'Item updated.',
      detail: `The item was marked as ${read ? 'read' : 'unread'}`,
      sticky: true,
    });
  };

  const model: MenuItem[] = [
    {
      className: 'kro-no-label',
      items: [
        {
          label: isRead ? 'Mark As Unread' : 'Mark As Read',
          icon: isRead ? <MarkUnread /> : <Check />,
          command: () => {
            setIsRead((x) => !x);
            showMarkedReadMessage(!isRead);
          },
        },
        {
          label: 'Delete',
          icon: <Delete />,
          className: 'kro-critical',
          command: showDeleteMessage,
        },
      ],
    },
  ];
  return (
    <ExampleWrapper className="relative flex h-64 min-w-96 justify-center">
      <div>
        <KInteractiveIcon
          icon={<DotsVertical />}
          onClick={(e) => {
            menuRef.current?.toggle(e);
          }}
        />
      </div>
      <KMenu
        model={model}
        className="mt-4 min-w-48"
        popup
        ref={menuRef}
        popupAlignment="right"
      />
      <KToast position="top-right" className="!absolute" ref={toastRef} />
    </ExampleWrapper>
  );
}
