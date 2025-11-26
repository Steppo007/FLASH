import type { Meta, StoryObj } from '@storybook/react-vite';
import { KConfirmDialog } from '@root/src/components/overlay/kconfirmdialog';
import { iconSvgs } from '@sbook/svgComponents.autogen';
import { svgStorybookMapObject } from '@sbook/utils';

const metaData = {
  title: 'Components/Overlay/KConfirmDialog',
  component: KConfirmDialog,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?type=design&node-id=101-29976&mode=design&t=sp4TMCsVPEmE7wcL-0',
    },
  },
  argTypes: {
    icon: {
      options: [...iconSvgs, 'none'],
      mapping: svgStorybookMapObject,
      control: { type: 'select' },
    },
  },
  render: (args) => {
    return (
      <KConfirmDialog
        {...args}
        visible={true}
        style={{ minWidth: '24rem', maxWidth: '70vw' }}
      />
    );
  },
} satisfies Meta<typeof KConfirmDialog>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    header: 'Confirmation',
    message: 'Are you sure you want to sign out?',
    icon: 'none',
    acceptLabel: 'Yes',
    rejectLabel: 'No',
  },
};
