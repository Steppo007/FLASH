// configures meta data for component in storybook

import type { Meta, StoryObj } from '@storybook/react-vite';
import { KSkeleton } from '@complib/misc/kskeleton';

const metaData = {
  title: 'Components/Misc/KSkeleton',
  component: KSkeleton,
  tags: [],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?node-id=8495-109721&node-type=frame&m=dev',
    },
  },
  argTypes: {
    animation: {
      options: ['wave', 'none'],
      control: { type: 'radio' },
      description: 'the type of animation',
    },
    shape: {
      options: ['circle', 'rectangle'],
      control: { type: 'radio' },
      description:
        'the shape of the skeleton (rectangle has no effect, circle adds 50% border radius)',
    },
    borderRadius: {
      description: 'corresponds to inline style. Takes precedence over shape.',
    },
    height: {
      description: 'The height of the element.',
    },
    width: {
      description: 'The width of the element.',
    },
    size: {
      description:
        'The height and width of the element. Takes precedence over individually set height and width.',
    },
  },
} satisfies Meta<typeof KSkeleton>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    animation: 'wave',
    shape: 'circle',
    borderRadius: '1rem',
    height: '1rem',
    width: '1rem',
    size: '5rem',
  },
};
