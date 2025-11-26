import type { Meta, StoryObj } from '@storybook/react-vite';
import { KMultiSelect } from '@root/src/components/form/kmultiselect';
import { useState } from 'react';
import { MultiSelectChangeEvent } from 'primereact/multiselect';
import { argDescriptions } from '../../argDescriptions';

interface City {
  name: string;
  code: string;
}

const metaData = {
  title: 'Components/Form/KMultiSelect',
  component: KMultiSelect,
  argTypes: {
    size: {
      options: ['small', 'default', 'large'],
      control: { type: 'radio' },
      description: 'The size of the multiselect',
    },
    ...argDescriptions.disabled,
    ...argDescriptions.invalid,
    ...argDescriptions.placeholder,
    filter: {
      control: 'boolean',
      description: 'whether or not the items are filterable by text',
      defaultValue: false,
    },
    display: {
      options: ['chip', 'comma'],
      control: { type: 'radio' },
      description: 'how to display the selection',
    },
    showSelectAll: {
      control: 'boolean',
      description:
        'whether or not all items can be selected with a single checkbox',
    },
    filterPlaceholder: {
      control: { type: 'text' },
      if: { arg: 'filter', truthy: true },
      description: 'The placeholder of the searchbar for filtering items',
    },
    ...argDescriptions.filterInputAutoFocus,
  },
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8hjJp1mUh5U2tZixhJrenI?node-id=9977%3A20603&main-component=1&fuid=1362365113992699424',
    },
  },
  render: (args) => {
    const [selectedCities, setSelectedCities] = useState<City | null>(null);

    const cities: City[] = [
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Paris', code: 'PRS' },
      { name: 'Munich', code: 'MUN' },
      { name: 'Budapest', code: 'BP' },
    ];

    return (
      <KMultiSelect
        value={selectedCities}
        onChange={(e: MultiSelectChangeEvent) => setSelectedCities(e.value)}
        options={cities}
        optionLabel="name"
        placeholder="Select Cities"
        className="w-48"
        {...args}
      />
    );
  },
} satisfies Meta<typeof KMultiSelect>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    size: 'default',
    invalid: false,
    disabled: false,
    filter: false,
    display: 'chip',
    showSelectAll: false,
    placeholder: 'Select cities',
    filterPlaceholder: 'Search...',
    filterInputAutoFocus: true,
    floatLabel: 'Cities',
    helperText: 'Helper text',
  },
};
