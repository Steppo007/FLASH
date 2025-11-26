import type { Meta, StoryObj } from '@storybook/react-vite';
import { KProgressSpinner } from '@complib/misc/kprogressspinner';
import { kroSizes } from '@root/src/components/utils/kroClassNames';

const metaData = {
  title: 'Components/Misc/KProgressSpinner',
  component: KProgressSpinner,
  tags: [],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?node-id=11398-105769&m=dev',
    },
  },
  argTypes: {
    size: {
      type: 'string',
      control: 'radio',
      options: kroSizes,
    },
  },
} satisfies Meta<typeof KProgressSpinner>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    size: 'default',
    strokeWidth: 6,
    animationDurationMillis: 1000,
  },
};
