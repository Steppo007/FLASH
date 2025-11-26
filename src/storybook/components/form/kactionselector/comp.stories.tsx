import { KActionSelector } from '@complib/form/kactionselector';
import { Meta, StoryObj } from '@storybook/react-vite';
import { ExampleKActionSelector } from '@sbook/components/form/kactionselector/example.tsx';

const metaData = {
  title: 'Components/Form/KActionSelector',
  component: KActionSelector,
  tags: [],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/uYzl38JcMuVNFfncMf3yxg/Ecosystem-App-Shell?node-id=7524-14975&m=dev',
    },
  },
  argTypes: {
    options: {
      table: {
        disable: true,
      },
    },
    value: {
      table: {
        disable: true,
      },
    },
    onSelectValue: {
      table: {
        disable: true,
      },
    },
    buttonUrl: {
      table: {
        disable: true,
      },
    },
    buttonCommand: {
      table: {
        disable: true,
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
    singleItemArray: {
      description: 'Leave only 1 option in the array',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    noBoundaryStyling: {
      description: 'Disable default boundary styling',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    buttonLabel: {
      description: 'Text label for the action button',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    overlayHint: {
      description: 'Hint text for overlay (optional)',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    overlayHeader: {
      description: 'Header text for overlay (optional)',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    label: {
      description: 'Label for the selector (optional)',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    buttonDisabled: {
      description: 'Disable Go to button',
      control: 'boolean',
    },
  },
  render: (args) => {
    return <ExampleKActionSelector {...args} />;
  },
} satisfies Meta<typeof KActionSelector>;

export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    singleItemArray: false,
    noBoundaryStyling: false,
    buttonLabel: 'Go to',
    label: 'City',
    overlayHeader: 'City selection',
    overlayHint: 'Switch to another city',
    buttonDisabled: false,
  },
};
