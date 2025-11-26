import type { Meta, StoryObj } from '@storybook/react-vite';
import { KMenu } from '@complib/menu/kmenu';
import PopupExample from './popupExample';
import BasicExample from './basicExample';
import HighlightExample from './highlightExample';
import CustomExample from './customExample';

const metaData = {
  title: 'Components/Menu/KMenu',
  component: KMenu,
  tags: [],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?node-id=6603-63488&m=dev',
    },
  },
  argTypes: {
    model: {
      control: 'radio',
      options: ['basic', 'highlighted', 'popup', 'custom'],
    },
  },
  render: (args) => {
    /* slight abuse of storybook */
    const model = args.model as string;

    if (model === 'basic') {
      return <BasicExample />;
    } else if (model === 'highlighted') {
      return <HighlightExample />;
    } else if (model === 'popup') {
      return <PopupExample />;
    } else {
      return <CustomExample />;
    }
  },
} satisfies Meta<typeof KMenu>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    model: 'basic',
  },
};
