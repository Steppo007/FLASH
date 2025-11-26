import type { Meta, StoryObj } from '@storybook/react-vite';
import { KTreeTable } from '@root/src/components/data/ktreetable';
import { Example } from './example/basicTreeTable';

const metaData = {
  title: 'Components/Data/KTreeTable',
  component: KTreeTable,
  tags: [],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fKPuy1VNDGLLkDbbKfAjvz/IAM-OC-User-Management--Krones?node-id=3256-42095&t=hV06rDSHusqx8FYq-1',
    },
  },
  argTypes: {
    sortMode: {
      control: 'radio',
      options: [undefined, 'single', 'multiple'],
      description:
        'Defines how sorting should be handled. When set to "multiple", you can select multiple columns by pressing the meta key (ctrl or similar). The "sortable" attribute needs to be applied to the desired columns.',
    },
    selectionMode: {
      control: 'radio',
      options: [undefined, 'single', 'multiple', 'checkbox'],
      description: 'if rows can be selected, and how.',
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
  },
  render: (args) => {
    return <Example {...args} />;
  },
} satisfies Meta<typeof KTreeTable>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    sortMode: 'single',
    selectionMode: 'single',
    scrollable: true,
    removableSort: true,
  },
};
