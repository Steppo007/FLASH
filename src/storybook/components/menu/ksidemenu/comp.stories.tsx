import type { Meta, StoryObj } from '@storybook/react-vite';
import { KSideMenu } from '@root/src/components/menu/ksidemenu';
import { model } from './example';
import { getSliceMapping } from '@root/src/storybook/utils';

const sliceMapping = getSliceMapping(model, (x) => x + ' tabs');

const metaData = {
  title: 'Components/Menu/KSideMenu',
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?type=design&node-id=6517-43058&mode=design&t=K0fcBHEi2wiU1l0j-0',
    },
  },
  argTypes: {
    model: {
      options: Object.keys(sliceMapping).slice(1),
      control: 'radio',
      mapping: sliceMapping,
    },
  },
  component: KSideMenu,
  render: (args) => {
    return (
      <div className="bg-surface-sidebar p-2">
        <KSideMenu {...args} />
      </div>
    );
  },
} satisfies Meta<typeof KSideMenu>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    model: sliceMapping['3 tabs'],
  },
};
