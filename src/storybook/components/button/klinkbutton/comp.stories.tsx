import { KLinkButton } from '@complib/button/klinkbutton';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { argDescriptions } from '../../argDescriptions';
import { iconSvgs } from '@sbook/svgComponents.autogen.tsx';
import { svgStorybookMapObject } from '@sbook/utils.tsx';

const metaData = {
  title: 'Components/Button/KLinkButton',
  component: KLinkButton,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?type=design&node-id=3068-18992&mode=design&t=u82Zywjvi2cRHQPp-0',
    },
  },
  argTypes: {
    ...argDescriptions.disabled,
    iconEnd: {
      options: [...iconSvgs],
      mapping: svgStorybookMapObject,
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof KLinkButton>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    size: 'default',
    showArrow: true,
    label: 'Krones',
    disabled: false,
  },
};
