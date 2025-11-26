import { KBadge } from '@complib/misc/kbadge';
import type { Meta, StoryObj } from '@storybook/react-vite';

const metaData = {
  title: 'Components/Misc/KBadge',
  component: KBadge,
  tags: [],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?type=design&node-id=2316-18731&mode=design&t=6eQdIH9FAZsd4qVp-0',
    },
  },
} satisfies Meta<typeof KBadge>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    label: '1',
    severity: 'danger',
    size: 'small',
    variant: 'filled',
  },
};
