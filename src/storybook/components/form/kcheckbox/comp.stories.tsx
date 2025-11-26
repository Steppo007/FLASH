import { KCheckbox } from '@root/src/components/form/kcheckbox';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { argDescriptions } from '../../argDescriptions';

const metaData = {
  title: 'Components/Form/KCheckbox',
  component: KCheckbox,
  tags: [],
  argTypes: {
    size: {
      options: ['default', 'small'],
      control: { type: 'radio' },
    },
    ...argDescriptions.disabled,
    ...argDescriptions.invalid,
  },
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?type=design&node-id=2861-1229&mode=design&t=u82Zywjvi2cRHQPp-0',
    },
    controls: {
      exclude: ['checked'],
    },
  },

  render: (args) => {
    const [checked, setIsChecked] = useState(false);
    return (
      <KCheckbox
        onClick={() => setIsChecked((x) => !x)}
        {...args}
        checked={checked}
      />
    );
  },
} satisfies Meta<typeof KCheckbox>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    invalid: false,
    size: 'default',
    disabled: false,
    label: 'Label',
    checked: false,
    infoIconText: '',
  },
};
