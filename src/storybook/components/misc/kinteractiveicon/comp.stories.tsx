import { KInteractiveIcon } from '@complib/misc/kinteractiveicon';
import { iconSvgs } from '@sbook/svgComponents.autogen';
import { svgStorybookMapObject } from '@sbook/utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { argDescriptions } from '../../argDescriptions';

const metaData = {
  title: 'Components/Misc/KInteractiveIcon',
  component: KInteractiveIcon,
  tags: [],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?type=design&node-id=2316-18731&mode=design&t=6eQdIH9FAZsd4qVp-0',
    },
  },
  argTypes: {
    icon: {
      options: [...iconSvgs, 'none'],
      mapping: svgStorybookMapObject,
      control: { type: 'select' },
    },
    ...argDescriptions.disabled,
  },
} satisfies Meta<typeof KInteractiveIcon>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    icon: 'infoOutlined',
    tooltipLabel: 'Tooltip Text',
    tooltipPosition: 'top',
    size: 'default',
    disabled: false,
  },
};
