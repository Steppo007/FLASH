import type { Meta, StoryObj } from '@storybook/react-vite';
import { KTreeSelect } from '@complib/form/ktreeselect';
import { TreeNode } from 'primereact/treenode';
import { useState } from 'react';
import { TreeSelectChangeEvent } from 'primereact/treeselect';
import { getExampleTreeNodes } from './example';
import { argDescriptions } from '../../argDescriptions';

const metaData = {
  title: 'Components/Form/KTreeSelect',
  component: KTreeSelect,
  tags: [],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?node-id=4233-9131',
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
    filter: {
      if: { arg: 'editable', truthy: false },
      description:
        'When specified, displays an input field to filter the items on keyup.',
    },
    filterPlaceholder: { if: { arg: 'filter', truthy: true } },
    emptyMessage: { if: { arg: 'filter', truthy: true } },
    ...argDescriptions.filterInputAutoFocus,
  },
  render: (props) => {
    const [nodes] = useState<TreeNode[]>(getExampleTreeNodes());
    const [selectedNodeKey, setSelectedNodeKey] = useState<string | null>(null);

    return (
      <KTreeSelect
        className="w-48"
        options={nodes}
        onChange={(e: TreeSelectChangeEvent) =>
          setSelectedNodeKey(e.value?.toString() ?? null)
        }
        value={selectedNodeKey}
        {...props}
      />
    );
  },
} satisfies Meta<typeof KTreeSelect>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    size: 'default',
    floatLabel: 'Choose...',
    placeholder: 'Select something...',
    disabled: false,
    invalid: false,
    filter: false,
    filterPlaceholder: 'Search...',
    filterInputAutoFocus: true,
    helperText: 'Required',
    emptyMessage: '',
    showClear: false,
  },
};
