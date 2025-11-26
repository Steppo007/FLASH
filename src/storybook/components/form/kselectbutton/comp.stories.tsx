import type { Meta, StoryObj } from '@storybook/react-vite';
import { KSelectButton } from '@root/src/components/form/kselectbutton';
import Check from '@root/assets/svgs/icons/check.svg?react';
import Close from '@root/assets/svgs/icons/close.svg?react';
import InfoOutlined from '@root/assets/svgs/icons/infoOutlined.svg?react';
import Telephone from '@root/assets/svgs/icons/telephone.svg?react';
import { useState } from 'react';

const metaData = {
  title: 'Components/Form/KSelectButton',
  component: KSelectButton,
  tags: [],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?type=design&node-id=8495-110251&mode=dev',
    },
  },
  argTypes: {
    options: {
      options: [
        '2 text options',
        '3 text options',
        '4 text options',
        '2 icon options',
        '3 options (mixed)',
        '4 icon options',
      ],
      mapping: {
        '2 text options': [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ],
        '3 text options': [
          { label: 'Small', value: 'small' },
          { label: 'Medium', value: 'medium' },
          { label: 'Large', value: 'large' },
        ],
        '4 text options': [
          { label: 'First', value: '1' },
          { label: 'Second', value: '2' },
          { label: 'Third', value: '3' },
          { label: 'Fourth', value: '4' },
        ],
        '2 icon options': [
          { icon: <Check />, value: 'yes' },
          { icon: <Close />, value: 'no' },
        ],
        '3 options (mixed)': [
          { label: 'Accept', icon: <Check />, value: 'yes' },
          { icon: <InfoOutlined />, value: 'info' },
          { label: 'Reject', icon: <Close />, value: 'no' },
        ],
        '4 icon options': [
          { icon: <Check />, value: 'yes' },
          { icon: <InfoOutlined />, value: 'info' },
          { icon: <Telephone />, value: 'telephone' },
          { icon: <Close />, value: 'no' },
        ],
      },
      control: { type: 'radio' },
    },
  },
  render: ({ ...args }) => {
    const [value, setValue] = useState(args.options![0].value);
    return (
      <KSelectButton
        allowEmpty={false}
        value={value}
        {...args}
        onChange={(e) => setValue(e.value)}
      />
    );
  },
} satisfies Meta<typeof KSelectButton>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    options: metaData.argTypes.options.mapping['3 text options'],
  },
};
