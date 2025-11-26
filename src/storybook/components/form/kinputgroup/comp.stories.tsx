import { KInputGroup } from '@root/src/components/form/kinputgroup';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { argDescriptions } from '../../argDescriptions';

const metaData = {
  title: 'Components/Form/KInputGroup',
  component: KInputGroup,
  tags: [],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library-4.2?node-id=26320-3573&m=dev',
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
      <KInputGroup
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...args}
      />
    );
  },
} satisfies Meta<typeof KInputGroup>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    disabled: false,
    helperText: 'Helper Text',
    floatLabel: '',
    size: 'default',
    invalid: false,
    placeholder: 'Enter Username',
    tooltipLabel: '',
    tooltipPosition: 'top',
    appendText: '@krones.com',
    prependText: '',
  },
};
