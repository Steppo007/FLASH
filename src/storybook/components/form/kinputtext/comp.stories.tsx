import { KInputText } from '@root/src/components/form/kinputtext';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { argDescriptions } from '../../argDescriptions';

const metaData = {
  title: 'Components/Form/KInputText',
  component: KInputText,
  tags: [],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?node-id=81-19812&t=nULdJPFTiT3MmbyW-0',
    },
  },
  argTypes: {
    ...argDescriptions.invalid,
    ...argDescriptions.disabled,
    ...argDescriptions.placeholder,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <KInputText
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...args}
      />
    );
  },
} satisfies Meta<typeof KInputText>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    disabled: false,
    helperText: 'Helper Text',
    floatLabel: 'City',
    size: 'default',
    invalid: false,
    placeholder: '',
    tooltipLabel: '',
    tooltipPosition: 'right',
  },
};
