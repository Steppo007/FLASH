import type { Meta, StoryObj } from '@storybook/react-vite';
import { KInputSwitch } from '@complib/form/kinputswitch';
import { argDescriptions } from '../../argDescriptions';
import { useState } from 'react';

const metaData = {
  title: 'Components/Form/KInputSwitch',
  component: KInputSwitch,
  tags: [],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?node-id=14894-22597',
    },
    controls: {
      exclude: ['checked'],
    },
  },
  argTypes: {
    ...argDescriptions.invalid,
    ...argDescriptions.disabled,
  },
  render: (props) => {
    const [checked, setIsChecked] = useState(false);
    return (
      <KInputSwitch
        onChange={() => setIsChecked((x) => !x)}
        {...props}
        checked={checked}
      />
    );
  },
} satisfies Meta<typeof KInputSwitch>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    size: 'default',
    disabled: false,
    invalid: false,
    label: 'Krones',
    checked: false,
    infoIconText: '',
  },
};
