import type { Meta, StoryObj } from '@storybook/react-vite';
import { KDataTable } from '@root/src/components/data/kdatatable';
import { StoryExample } from './examples/story';

const metaData = {
  title: 'Components/Data/KDataTable',
  component: KDataTable,
  tags: [],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?type=design&node-id=156-7884&mode=design&t=zKBoINNcG15ufodk-0',
    },
  },
  argTypes: {
    size: {
      options: ['small', 'normal', 'large'],
      control: 'radio',
      description: 'Controls the vertical padding in the table',
    },
    showGridlines: {
      control: 'boolean',
      description: 'Whether to show grid lines between cells.',
    },
    sortMode: {
      control: 'radio',
      options: [undefined, 'single', 'multiple'],
      description:
        'Defines how sorting should be handled. When set to "multiple", you can select multiple columns by pressing the meta key (ctrl or similar). The "sortable" attribute needs to be applied to the desired columns.',
    },
    selectionMode: {
      control: 'radio',
      options: [undefined, 'single', 'multiple', 'radiobutton', 'checkbox'],
      description:
        'if rows can be selected, and how. Note, currently the styles for the header checkbox are not working properly due to issues with PrimeReact.',
    },
    removableSort: {
      control: 'boolean',
      description:
        'when enabled, columns can be restored to their default state after being sorted.',
    },
    scrollable: {
      control: 'boolean',
      description: 'whether or not the header is sticky while scrolling',
    },
    metaKeySelection: {
      control: 'boolean',
      description:
        'when enabled, holding down the meta key (ctrl or similar) is required to perform certain operations, like selecting multiple rows, or clicking to deselect a row',
    },
  },
  render: (args) => {
    return <StoryExample {...args} />;
  },
} satisfies Meta<typeof KDataTable>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    size: 'small',
    showGridlines: true,
    sortMode: 'single',
    selectionMode: 'single',
    removableSort: false,
    metaKeySelection: true,
    scrollable: true,
  },
};
