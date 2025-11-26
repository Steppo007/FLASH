import { useState } from 'react';
import {
  KTreeTable,
  KTreeTableColumn,
} from '@root/src/components/data/ktreetable/';
import type { TreeNode } from 'primereact/treenode';
import {
  TreeTableProps,
  TreeTableSelectionKeysType,
} from 'primereact/treetable';

type ExampleProps = Partial<TreeTableProps>;

export const Example = (props: ExampleProps) => {
  const [selectedNodeKey, setSelectedNodeKey] = useState<
    string | TreeTableSelectionKeysType | null
  >(null);

  const files: TreeNode[] = [
    {
      key: '0',
      data: { name: 'Documents', size: '75kb', type: 'Folder' },
      children: [
        {
          key: '0-0',
          data: { name: 'Work', size: '55kb', type: 'Folder' },
          children: [
            {
              key: '0-0-0',
              data: { name: 'Expenses.doc', size: '30kb', type: 'Document' },
            },
            {
              key: '0-0-1',
              data: { name: 'Resume.doc', size: '25kb', type: 'Document' },
            },
          ],
        },
        {
          key: '0-1',
          data: { name: 'Home', size: '20kb', type: 'Folder' },
          children: [
            {
              key: '0-1-0',
              data: { name: 'Invoices.txt', size: '20kb', type: 'Text' },
            },
          ],
        },
      ],
    },
    {
      key: '1',
      data: { name: 'Pictures', size: '150kb', type: 'Folder' },
      children: [
        {
          key: '1-0',
          data: { name: 'barcelona.jpg', size: '90kb', type: 'Image' },
        },
        {
          key: '1-1',
          data: { name: 'logo.jpg', size: '60kb', type: 'Image' },
        },
      ],
    },
    {
      key: '2',
      data: { name: 'Movies', size: '450kb', type: 'Folder' },
      children: [],
    },
    {
      key: '3',
      data: { name: 'Videos', size: '450kb', type: 'Folder' },
      children: [
        {
          key: '3-0',
          data: { name: 'video.mp4', size: '450kb', type: 'Video' },
        },
      ],
    },
    {
      key: '4',
      data: { name: 'Music', size: '450kb', type: 'Folder' },
      children: [
        {
          key: '4-0',
          data: { name: 'song.mp3', size: '450kb', type: 'Audio' },
        },
      ],
    },
  ];

  const nameTemplate = (node: TreeNode) => {
    return node.data.name;
  };

  const sizeTemplate = (node: TreeNode) => {
    return node.data.size;
  };

  const typeTemplate = (node: TreeNode) => {
    return node.data.type;
  };

  return (
    <div style={{ width: '800px' }}>
      <KTreeTable
        scrollHeight="12rem"
        value={files}
        {...props}
        selectionMode={props.selectionMode}
        selectionKeys={selectedNodeKey}
        onSelectionChange={(e) => setSelectedNodeKey(e.value)}
      >
        <KTreeTableColumn
          field="name"
          header="Name"
          expander
          body={nameTemplate}
          sortable={props.sortMode != undefined}
        />
        <KTreeTableColumn
          sortable={props.sortMode != undefined}
          field="size"
          header="Size"
          body={sizeTemplate}
        />
        <KTreeTableColumn
          sortable={props.sortMode != undefined}
          field="type"
          header="Type"
          body={typeTemplate}
        />
      </KTreeTable>
    </div>
  );
};
