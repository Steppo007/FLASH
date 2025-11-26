import type { Meta, StoryObj } from '@storybook/react-vite';
import { KRadioButton } from '@complib/form/kradiobutton';
import { useState } from 'react';
import { argDescriptions } from '../../argDescriptions';

const metaData = {
  title: 'Components/Form/KRadioButton',
  component: KRadioButton,
  tags: [],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?type=design&node-id=2861-1229&mode=design&t=u82Zywjvi2cRHQPp-0',
    },
  },
  argTypes: {
    ...argDescriptions.invalid,
    ...argDescriptions.disabled,
  },
  render: (args) => {
    const [isChecked, setIsChecked] = useState(false);
    return (
      <KRadioButton
        checked={isChecked}
        onChange={() => {
          setIsChecked(true);
        }}
        {...args}
      />
    );
  },
} satisfies Meta<typeof KRadioButton>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    size: 'default',
    disabled: false,
    invalid: false,
    label: 'Krones',
    infoIconText: '',
  },
};
