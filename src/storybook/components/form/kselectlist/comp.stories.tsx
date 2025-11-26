// configures meta data for component in storybook

import type { Meta, StoryObj } from '@storybook/react-vite';
import { KSelectList } from '@complib/form/kselectlist';
import { useState } from 'react';

const metaData = {
  title: 'Components/Form/KSelectList',
  component: KSelectList,
  tags: [],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?node-id=22889-14679&m=dev',
    },
    controls: {
      exclude: ['options', 'onSelect', 'value'],
    },
  },
  argTypes: {
    selectionMode: {
      options: ['single', 'multiple'],
      control: { type: 'radio' },
      description: 'The selection mode of the select list',
      defaultValue: 'single',
    },
  },
  render: (args) => {
    const initValue = args.selectionMode === 'multiple' ? ['en-GB'] : 'en-GB';
    const [value, setValue] = useState<string | string[]>(initValue);

    return (
      <div className="w-80">
        <KSelectList {...args} value={value} onSelect={(e) => setValue(e)} />
      </div>
    );
  },
} satisfies Meta<typeof KSelectList>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    header: 'Language',
    options: [
      { label: 'English (UK)', value: 'en-GB' },
      { label: 'Deutsch', value: 'de-DE' },
    ],
    value: 'en-GB',
  },
};
