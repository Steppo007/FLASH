import type { Meta, StoryObj } from '@storybook/react-vite';
import { KSideNav } from '@root/src/components/menu/ksidenav';
import Example from './example';

const metaData = {
  title: 'Components/Menu/KSideNav',
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?type=design&node-id=6517-43058&mode=design&t=K0fcBHEi2wiU1l0j-0',
    },
    controls: {
      exclude: ['navigationModel', 'sideBarAnchor', 'isItemActiveCallback'],
    },
  },
  component: KSideNav,
  render: (args: { productTitle: string }) => {
    return <Example productTitle={args.productTitle} />;
  },
} satisfies Meta<typeof KSideNav>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    navigationModel: [],
    productTitle: 'Example Application',
    sideBarAnchor: 'self',
  },
};
