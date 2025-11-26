import type { Meta, StoryObj } from '@storybook/react-vite';
import { KDialog } from '@root/src/components/overlay/kdialog';
import Example from './example';

const metaData = {
  title: 'Components/Overlay/KDialog',
  component: KDialog,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?type=design&node-id=101-29976&mode=design&t=sp4TMCsVPEmE7wcL-0',
    },
    controls: {
      exclude: ['onHide'],
    },
  },
  render: Example,
} satisfies Meta<typeof KDialog>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    onHide: () => undefined,
  },
};
