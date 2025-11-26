// configures meta data for component in storybook

import type { Meta, StoryObj } from '@storybook/react-vite';
import { KPickList } from '@complib/data/kpicklist';
import Example from './example';

const metaData = {
  title: 'Components/Data/KPickList',
  component: KPickList,
  tags: [],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?node-id=7318-126330&m=dev',
    },
    controls: {
      exclude: ['dataKey', 'filter'],
    },
  },
  argTypes: {
    filterBy: {
      control: 'radio',
      options: [undefined, 'name', 'country', 'name,country'],
      description:
        'When specified, displays an input field to filter the items based on the given field (accepts multiple fields with a comma).',
    },
    sourceHeader: {
      description: 'The header for the source list',
    },
    targetHeader: {
      description: 'The header for the target list',
    },
    showSourceControls: {
      description:
        'When enabled, provides controls for editing the source list',
    },
    showTargetControls: {
      description:
        'When enabled, provides controls for editing the target list',
    },
  },
  render: (args) => {
    return <Example {...args} />;
  },
} satisfies Meta<typeof KPickList>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    dataKey: 'id',
    filterBy: undefined,
    sourceHeader: 'Available Writers',
    targetHeader: 'Selected Writers',
    showSourceControls: true,
    showTargetControls: true,
  },
};
