import type { Meta, StoryObj } from '@storybook/react-vite';
import { iconSvgs } from '@sbook/svgComponents.autogen';
import { KAvatar } from '@complib/misc/kavatar';
import { KBadge } from '@root/src/components/misc/kbadge';
import { svgStorybookMapObject } from '@sbook/utils';

const metaData = {
  title: 'Components/Misc/KAvatar',
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?type=design&node-id=230-16631&mode=design&t=u82Zywjvi2cRHQPp-0',
    },
  },
  component: KAvatar,
  argTypes: {
    imageUrl: {
      control: 'radio',
      options: ['none', 'user'],
      mapping: {
        none: undefined,
        user: '/dummyUser.png',
      },
    },
    icon: {
      options: [...iconSvgs, 'none'],
      mapping: svgStorybookMapObject,
      control: { type: 'select' },
    },
    children: {
      control: 'radio',
      options: ['no badge', 'small badge', 'large badge'],
      mapping: {
        'no badge': <></>,
        'small badge': (
          <KBadge label="1" severity="danger" size="small" variant="outlined" />
        ),
        'large badge': (
          <KBadge label="1" severity="danger" size="large" variant="outlined" />
        ),
      },
    },
  },
} satisfies Meta<typeof KAvatar>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    size: 'normal',
    label: 'XY',
    imageUrl: 'none',
    icon: 'none',
    children: 'small badge',
  },
};
