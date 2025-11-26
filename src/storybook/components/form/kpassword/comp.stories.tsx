import { KPassword } from '@root/src/components/form/kpassword';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { argDescriptions } from '../../argDescriptions';

const metaData = {
  title: 'Components/Form/KPassword',
  component: KPassword,
  tags: [],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fKPuy1VNDGLLkDbbKfAjvz/IAM-OC-User-Management--Krones?node-id=7941-5608&m=dev',
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
      <KPassword
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...args}
      />
    );
  },
} satisfies Meta<typeof KPassword>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    disabled: false,
    helperText: 'Enter a strong password',
    floatLabel: 'Password',
    size: 'default',
    invalid: false,
    placeholder: '',
    feedback: false,
    toggleMask: true,
  },
};
