import { KTreeSelect } from '@complib/form/ktreeselect';
import { ExampleWrapper } from '@sbook/utils';
import { TreeNode } from 'primereact/treenode';
import { TreeSelectChangeEvent } from 'primereact/treeselect';
import { useState } from 'react';

export default function Example() {
  const [nodes] = useState<TreeNode[]>(getExampleTreeNodes());
  const [selectedNodeKey, setSelectedNodeKey] = useState<string | null>(null);
  const isRetroSelected = selectedNodeKey === '1-1';

  return (
    <ExampleWrapper className="flex items-center justify-center">
      <KTreeSelect
        size="default"
        className="w-48"
        options={nodes}
        invalid={isRetroSelected}
        helperText={isRetroSelected ? 'Invalid choice' : undefined}
        floatLabel="Choose..."
        onChange={(e: TreeSelectChangeEvent) =>
          setSelectedNodeKey(e.value?.toString() ?? null)
        }
        value={selectedNodeKey}
      />
    </ExampleWrapper>
  );
}

export function getExampleTreeNodes(): TreeNode[] {
  return [
    {
      key: '0',
      label: 'Documents',
      selectable: false,
      children: [
        {
          key: '0-0',
          label: 'Work',
          children: [
            {
              key: '0-0-0',
              label: 'Expenses.doc',
            },
            {
              key: '0-0-1',
              label: 'Resume.doc',
            },
          ],
        },
        {
          key: '0-1',
          label: 'Home',
          children: [
            {
              key: '0-1-0',
              label: 'Invoices.txt',
            },
          ],
        },
      ],
    },
    {
      key: '1',
      label: 'Events',
      selectable: false,
      children: [
        {
          key: '1-0',
          label: 'Daily',
        },
        {
          key: '1-1',
          label: 'Retrospective',
        },
        {
          key: '1-2',
          label: 'Sprint Planning',
        },
      ],
    },
  ];
}
