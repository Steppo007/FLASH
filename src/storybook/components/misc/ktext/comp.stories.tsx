import { KText } from '@root/src/components/misc/ktext';
import type { Meta, StoryObj } from '@storybook/react-vite';

const metaData = {
  title: 'Components/Misc/KText',
  component: KText,
  tags: [],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?type=design&node-id=5259-63114&mode=dev',
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'The text itself',
      defaultValue: '',
    },
  },
} satisfies Meta<typeof KText>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    type: 'h1',
    children: 'Krones Digital',
  },
};
