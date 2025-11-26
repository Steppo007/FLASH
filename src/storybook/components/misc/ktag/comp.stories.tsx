import { KTag } from '@complib/misc/ktag';
import { productSvgs } from '@sbook/svgComponents.autogen';
import { svgStorybookMapObject } from '@sbook/utils';
import type { Meta, StoryObj } from '@storybook/react-vite';

const metaData = {
  title: 'Components/Misc/KTag',
  component: KTag,
  tags: [],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?node-id=241-10577&m=dev',
    },
  },
  argTypes: {
    icon: {
      options: productSvgs,
      mapping: svgStorybookMapObject,
      control: { type: 'select' },
      description: 'Icon to show inside the tag',
    },
    severity: {
      control: { type: 'radio' },
      options: ['success', 'info', 'warning', 'danger', 'neutral'],
      description: 'Visual style of the tag',
    },
    value: {
      control: 'text',
      description: 'Text content of the tag',
    },
    rounded: {
      control: 'boolean',
      description: 'Whether the tag should have rounded corners',
    },
  },
} satisfies Meta<typeof KTag>;

export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    icon: '',
    severity: 'success',
    value: 'Success',
    rounded: true,
  },
};
