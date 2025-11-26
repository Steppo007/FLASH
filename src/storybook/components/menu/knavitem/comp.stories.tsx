import { KNavItem } from '@root/src/components/menu/knavitem';
import { KBadge } from '@complib/misc/kbadge';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { iconSvgs } from '@sbook/svgComponents.autogen';
import { svgStorybookMapObject } from '@sbook/utils';

const metaData = {
  title: 'Components/Menu/KNavItem',
  component: KNavItem,
  tags: [],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?type=design&node-id=2464-39772&mode=design&t=YTxR5RQKnLfNSXVl-0',
    },
    controls: {
      exclude: ['positionBadge'],
    },
  },

  argTypes: {
    icon: {
      options: [...iconSvgs, 'none'],
      mapping: svgStorybookMapObject,
      control: { type: 'select' },
    },
    iconEnd: {
      options: [...iconSvgs, 'none'],
      mapping: svgStorybookMapObject,
      control: { type: 'select' },
    },
    children: {
      options: ['no badge', 'small badge', 'large badge'],
      mapping: {
        'no badge': <></>,
        'small badge': <KBadge size="small" />,
        'large badge': <KBadge size="large" />,
      },
      control: { type: 'radio' },
    },
  },
  render: ({ ...args }) => {
    return (
      <KNavItem positionBadge={true} {...args}>
        {args.children}
      </KNavItem>
    );
  },
} satisfies Meta<typeof KNavItem>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    isHighlighted: false,
    iconPos: 'left',
    label: 'Krones',
    icon: 'none',
    iconEnd: 'none',
    children: <></>,
  },
};
