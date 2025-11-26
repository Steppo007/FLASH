import type { Meta, StoryObj } from '@storybook/react-vite';
import { iconSvgs, productSvgs } from '@sbook/svgComponents.autogen';
import { KTile } from '@complib/misc/ktile';
import { svgStorybookMapObject } from '@sbook/utils';

const metaData = {
  title: 'Components/Misc/KTile',
  component: KTile,
  tags: [],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?type=design&node-id=2648-3399&mode=design&t=OWxXZoRxvxT6Fyyq-0',
    },
  },
  argTypes: {
    children: {
      options: [...iconSvgs, ...productSvgs],
      mapping: svgStorybookMapObject,
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof KTile>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    label: 'Krones',
    children: svgStorybookMapObject[iconSvgs[0]],
    view: 'tile',
    greyedOut: false,
  },
};
