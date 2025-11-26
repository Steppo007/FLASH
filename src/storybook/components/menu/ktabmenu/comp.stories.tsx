import type { Meta, StoryObj } from '@storybook/react-vite';
import { KTabMenu } from '@root/src/components/menu/ktabmenu';
import { model } from './example';

const metaData = {
  title: 'Components/Menu/KTabMenu',
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?node-id=3768%3A25865&mode=dev',
    },
  },
  render: (args) => {
    return <KTabMenu model={model} {...args} />;
  },
  argTypes: {
    size: {
      options: ['small', 'default'],
      control: { type: 'radio' },
    },
  },
  component: KTabMenu,
} satisfies Meta<typeof KTabMenu>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    size: 'default',
  },
};
