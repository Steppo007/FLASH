import type { Meta, StoryObj } from '@storybook/react-vite';
import { KInputDropdown } from '@root/src/components/form/kinputdropdown';
import { useState } from 'react';
import { argDescriptions } from '../../argDescriptions';

const metaData = {
  title: 'Components/Form/KInputDropdown',
  component: KInputDropdown,
  tags: [],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?type=design&node-id=8495-109972&mode=design&t=Y1Si8hiIou7tvKhG-0',
    },
  },
  argTypes: {
    ...argDescriptions.disabled,
    ...argDescriptions.invalid,
    ...argDescriptions.placeholder,
    showClear: {
      description:
        'When enabled, a clear icon is displayed to clear the value.',
    },
    editable: {
      if: { arg: 'filter', truthy: false },
      description:
        'When present, custom value instead of predefined options can be entered using the editable input field.',
    },
    filter: {
      if: { arg: 'editable', truthy: false },
      description:
        'When specified, displays an input field to filter the items on keyup.',
    },
    filterPlaceholder: { if: { arg: 'filter', truthy: true } },
    emptyFilterMessage: { if: { arg: 'filter', truthy: true } },
    ...argDescriptions.filterInputAutoFocus,
  },
  render: (props) => {
    const [selectedCity, setSelectedCity] = useState(null);
    const cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];

    return (
      <KInputDropdown
        className="w-48"
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.value)}
        options={cities}
        optionLabel="name"
        resetFilterOnHide={true}
        {...props}
      />
    );
  },
} satisfies Meta<typeof KInputDropdown>;
export default metaData;

type Story = StoryObj<typeof KInputDropdown>;

export const Story: Story = {
  args: {
    size: 'default',
    floatLabel: 'City',
    placeholder: '',
    helperText: 'Required',
    disabled: false,
    invalid: false,
    showClear: false,
    editable: false,
    filter: false,
    filterPlaceholder: 'Search...',
    filterInputAutoFocus: false,
    emptyFilterMessage: 'No available options',
  },
};
