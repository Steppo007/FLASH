import type { Meta, StoryObj } from '@storybook/react-vite';
import { KTooltip } from '@complib/overlay/ktooltip';
import { Example } from './example';

const metaData = {
  title: 'Components/Overlay/KTooltip',
  component: KTooltip,
  tags: [],
  argTypes: {
    position: {
      options: ['bottom', 'top', 'left', 'right'],
      control: { type: 'radio' },
      description: 'position of the tooltip',
    },
    content: {
      description: 'text content of the tooltip',
    },
    event: {
      options: ['hover', 'focus', 'both'],
      control: { type: 'radio' },
      description: 'the javascript event which will trigger the tooltip',
    },
  },
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?node-id=118-38760&t=xL1XzCC3KMJLQa0d-0',
    },
  },
  render: Example,
} satisfies Meta<typeof KTooltip>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    position: 'top',
    content: 'Tooltip Text',
    event: 'hover',
  },
};
