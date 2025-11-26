import { KSeverityIcon } from '@complib/misc/kseverityicon';
import { productSvgs } from '@sbook/svgComponents.autogen';
import { svgStorybookMapObject } from '@sbook/utils';
import type { Meta, StoryObj } from '@storybook/react-vite';

const metaData = {
  title: 'Components/Misc/KSeverityIcon',
  component: KSeverityIcon,
  tags: [],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    icon: {
      options: productSvgs,
      mapping: svgStorybookMapObject,
      control: { type: 'select' },
      description: 'the primary icon to show',
    },
    severity: {
      description: 'determines the severity indicator to show in the corner',
    },
    size: {
      description: 'the size of the component',
    },
  },
} satisfies Meta<typeof KSeverityIcon>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    icon: 'connect',
    severity: 'error',
    size: 'small',
  },
};
