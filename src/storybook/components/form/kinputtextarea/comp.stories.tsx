import type { Meta, StoryObj } from '@storybook/react-vite';
import { KInputTextarea } from '@complib/form/kinputtextarea';
import { useState } from 'react';

const metaData = {
  title: 'Components/Form/KInputTextArea',
  component: KInputTextarea,
  tags: [],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?node-id=9271-38390&m=dev',
    },
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <KInputTextarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...args}
      />
    );
  },
} satisfies Meta<typeof KInputTextarea>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    invalid: false,
    disabled: false,
    placeholder: '',
    floatLabel: 'Label',
    helperText: 'Helper Text',
    rows: 5,
    cols: 50,
  },
};
