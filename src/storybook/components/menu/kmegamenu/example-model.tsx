import Folder from '@root/assets/svgs/icons/folder.svg?react';
import AccountFigure from '@root/assets/svgs/icons/accountFigure.svg?react';
import BarChart from '@root/assets/svgs/icons/barChart.svg?react';
import { MenuItem, MenuItemCommandEvent } from 'primereact/menuitem';

export const menuItems = (command: NonNullable<MenuItem['command']>) =>
  populateTemplateWithIds(menuTemplate(), command);

function populateTemplateWithIds(
  template: MenuItem[],
  command: NonNullable<MenuItem['command']>
): MenuItem[] {
  return template?.map((item: MenuItem) => {
    return {
      ...item,
      id:
        item.id ??
        (item.label || '')
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, ''),
      command: !item.items || item.items.length === 0 ? command : item.command,
      items: item.items
        ? populateTemplateWithIds(item.items as MenuItem[], command)
        : undefined,
    };
  });
}

const categoryCommand = (event: MenuItemCommandEvent) => {
  console.log('Link for category ' + event.item.label);
};

function menuTemplate(): MenuItem[] {
  return [
    {
      label: 'Videos',
      icon: <Folder />,
      items: [
        {
          label: 'Video 1',
          icon: <Folder />,
          items: [
            {
              label: 'Video 1.1 production',
              icon: <Folder />,
              id: 'active-video',
              url: '/videos',
            },
            { label: 'Video 1.2' },
          ],
        },
        {
          label: 'Video 2 management',
          items: [
            {
              label:
                'This Video Label Is sooo Long, it should be wrapped into a couple of rows',
              icon: <Folder />,
            },
            { label: 'Video 2.2' },
          ],
        },
        {
          label: 'Video 3',
          items: [{ label: 'Video 3.1' }, { label: 'Video 3.2' }],
        },
        {
          label: 'Video 4',
          items: [{ label: 'Video 4.1' }, { label: 'Video 4.2' }],
        },
      ],
    },
    {
      label: 'Users',
      icon: <AccountFigure />,
      items: [
        {
          label: 'User 1 and user management',
          items: [{ label: 'User 1.1' }, { label: 'User 1.2' }],
        },
        {
          label: 'User 2',
          items: [{ label: 'User 2.1' }, { label: 'User 2.2' }],
        },
        {
          label: 'User 3',
          items: [{ label: 'User 3.1' }, { label: 'User 3.2' }],
        },
        {
          label: 'User 4',
          items: [{ label: 'User 4.1' }, { label: 'User 4.2' }],
        },
        {
          label: 'User 5',
          items: [{ label: 'User 5.1' }, { label: 'User 5.2' }],
        },
        {
          label: 'User 6',
          items: [{ label: 'User 6.1' }, { label: 'User 6.2' }],
        },
        {
          label: 'User 7',
          items: [{ label: 'User 7.1' }, { label: 'User 7.2' }],
        },
      ],
    },
    {
      label: 'Games',
      icon: <BarChart />,
      data: {
        ktabbed: {
          categoryLinkLabel: 'Game level overview',
          categoryControlLabel: 'Game direct access',
          categoryControlLabelMobile: 'Game selected',
          categorySelectorHeaderMobile: 'Choose the game',
          categorySelectorHintMobile: 'Tap the item',
        },
      },
      items: [
        {
          label: 'Game 1',
          command: categoryCommand,
          icon: <Folder />,
          items: [
            {
              label: 'Level 1.1',
              items: [
                { label: 'Level 1.1.1', icon: <BarChart /> },
                { label: 'Level 1.1.2', icon: <BarChart /> },
              ],
            },
            {
              label: 'Level 1.2',
              items: [
                { label: 'Level 1.2.1', icon: <BarChart /> },
                { label: 'Level 1.2.2', icon: <BarChart /> },
                { label: 'Level 1.2.3', icon: <BarChart /> },
              ],
            },
            {
              label: 'Level 1.3',
              items: [
                { label: 'Level 1.3.1', icon: <BarChart /> },
                { label: 'Level 1.3.2', icon: <BarChart /> },
                { label: 'Level 1.3.3', icon: <BarChart /> },
                { label: 'Level 1.3.4', icon: <BarChart /> },
              ],
            },
            {
              label: 'Level 1.4',
              items: [
                { label: 'Level 1.4.1', icon: <BarChart /> },
                { label: 'Level 1.4.2', icon: <BarChart /> },
                { label: 'Level 1.4.3', icon: <BarChart /> },
              ],
            },
            {
              label: 'Level 1.5',
              items: [
                { label: 'Level 1.5.1', icon: <BarChart /> },
                { label: 'Level 1.5.2', icon: <BarChart /> },
                { label: 'Level 1.5.3', icon: <BarChart /> },
              ],
            },
            {
              label: 'Level 1.6',
              items: [
                { label: 'Level 1.6.1', icon: <BarChart /> },
                { label: 'Level 1.6.2', icon: <BarChart /> },
              ],
            },
            {
              label: 'Level 1.7',
              items: [
                { label: 'Level 1.7.1', icon: <BarChart /> },
                { label: 'Level 1.7.2', icon: <BarChart /> },
                { label: 'Level 1.7.3', icon: <BarChart /> },
                { label: 'Level 1.7.4', icon: <BarChart /> },
              ],
            },
          ],
        },
        {
          label: 'Game 2',
          command: categoryCommand,
          icon: <AccountFigure />,
          disabled: true,
          items: [
            { label: 'Level 2.1', icon: <BarChart />, disabled: true },
            { label: 'Level 2.2', icon: <BarChart /> },
            { label: 'Level 2.3', icon: <BarChart /> },
            { label: 'Level 2.4', icon: <BarChart /> },
            { label: 'Level 2.5', icon: <BarChart /> },
            { label: 'Level 2.6', icon: <BarChart /> },
            { label: 'Level 2.7', icon: <BarChart /> },
            { label: 'Level 2.8', icon: <BarChart /> },
            { label: 'Level 2.9', icon: <BarChart /> },
            { label: 'Level 2.10', icon: <BarChart /> },
            { label: 'Level 2.11', icon: <BarChart /> },
            { label: 'Level 2.12', icon: <BarChart /> },
          ],
        },
      ],
    },
    {
      label: 'Simple button',
    },
  ];
}
