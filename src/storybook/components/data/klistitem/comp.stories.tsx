// configures meta data for component in storybook

import type { Meta, StoryObj } from '@storybook/react-vite';
import { KListItem } from '@complib/data/klistitem';
import { KAvatar } from '@root/src/components/misc/kavatar';
import AccountFigureIcon from '@root/assets/svgs/icons/accountFigure.svg?react';
import ArrowRightIcon from '@root/assets/svgs/icons/arrowRight.svg?react';
import InfoFilledIcon from '@root/assets/svgs/icons/infoFilled.svg?react';

const metaData = {
  title: 'Components/Data/KListItem',
  component: KListItem,
  tags: [],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?node-id=4862-43658&m=dev',
    },
    controls: {
      exclude: ['ref', 'pt'],
    },
  },
  argTypes: {
    leadingItem: {
      description:
        'The item shown at the start of the list item. \n\n THE OPTIONS ARE ONLY EXAMPLES - You have to provide your own items or pick some from the flash library!',
      options: ['KAvatar', 'Icon', 'None'],
      mapping: {
        KAvatar: <KAvatar icon={<AccountFigureIcon />} />,
        Icon: (
          <InfoFilledIcon className="text-content-bodytext z-20 box-content h-6 w-6 p-3" />
        ),
        None: null,
      },
      table: { defaultValue: { summary: 'KAvatar' } },
    },
    trailingItem: {
      description:
        'The item shown at the end of the list item. \n\n THE OPTIONS ARE ONLY EXAMPLES - You have to provide your own items or pick some from the flash library!',
      options: ['ArrowIcon', 'None'],
      mapping: {
        ArrowIcon: <ArrowRightIcon className="h-6 w-6" />,
        None: null,
      },
      table: { defaultValue: { summary: 'ArrowIcon' } },
    },
  },
  render: (args) => {
    return (
      <div className="w-80">
        <KListItem {...args} />
      </div>
    );
  },
} satisfies Meta<typeof KListItem>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    overline: '001',
    headline: 'George Orwell',
    supportingText: 'United Kingdom',
    leadingItem: <KAvatar icon={<AccountFigureIcon />} />,
    trailingItem: <ArrowRightIcon className="h-6 w-6" />,
    component: 'button',
  },
};
