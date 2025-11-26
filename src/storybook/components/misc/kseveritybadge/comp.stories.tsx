import type { Meta, StoryObj } from '@storybook/react-vite';
import { KSeverityBadge } from '@complib/misc/kseveritybadge';

const metaData = {
  title: 'Components/Misc/KSeverityBadge',
  component: KSeverityBadge,
  tags: [],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    severity: {
      description: 'determines the severity indicator to show in the corner',
    },
  },
} satisfies Meta<typeof KSeverityBadge>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    severity: 'info',
  },
};
