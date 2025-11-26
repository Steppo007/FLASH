import { KInputSearch } from '@root/src/components/form/kinputsearch';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { argDescriptions } from '../../argDescriptions';
import { AutoCompleteCompleteEvent } from 'primereact/autocomplete';

const metaData = {
  title: 'Components/Form/KInputSearch',
  component: KInputSearch,
  tags: [],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?node-id=4233-28155&p=f&m=dev',
    },
  },
  argTypes: {
    ...argDescriptions.invalid,
    ...argDescriptions.disabled,
    ...argDescriptions.placeholder,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    const [items, setItems] = useState<string[]>([]);

    const search = (event: AutoCompleteCompleteEvent) => {
      setItems([...Array(10).keys()].map((item) => event.query + '-' + item));
    };

    return (
      <KInputSearch
        value={value}
        suggestions={items}
        completeMethod={search}
        onChange={(event) => setValue(event.value)}
        {...args}
      />
    );
  },
} satisfies Meta<typeof KInputSearch>;
export default metaData;

type Story = StoryObj<typeof metaData>;
export const Story: Story = {
  args: {
    disabled: false,
    helperText: 'Helper Text',
    floatLabel: 'Username',
    size: 'default',
    invalid: false,
    placeholder: '',
  },
};
