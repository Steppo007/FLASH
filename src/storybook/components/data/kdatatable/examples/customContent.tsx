import { KColumn, KDataTable } from '@root/src/components/data/kdatatable';
import KSeverityBadge from '@root/src/components/misc/kseveritybadge';
import { KSeverity } from '@root/src/components/misc/kseverityicon';
import { ExampleWrapper } from '@root/src/storybook/utils';

import Delete from '@root/assets/svgs/icons/delete.svg?react';
import Edit from '@root/assets/svgs/icons/edit.svg?react';
import Check from '@root/assets/svgs/icons/check.svg?react';

import { KInteractiveIcon } from '@root/src/components/misc/kinteractiveicon';
import { useState } from 'react';
import KInputText from '@root/src/components/form/kinputtext';
import KText from '@root/src/components/misc/ktext';
import KInputDropdown from '@root/src/components/form/kinputdropdown';

interface Entry {
  id: string;
  severity: KSeverity;
  item: string;
  category: string;
  editing: boolean;
}

export function CustomContentExample() {
  const initialEntries: Entry[] = [
    {
      id: '1',
      item: 'Item 1',
      category: 'A',
      severity: 'error',
      editing: false,
    },
    {
      id: '2',
      item: 'Item 2',
      category: 'A',
      severity: 'info',
      editing: false,
    },
    {
      id: '3',
      item: 'Item 3',
      category: 'B',
      severity: 'error',
      editing: false,
    },
    {
      id: '4',
      item: 'Item 4',
      category: 'A',
      severity: 'warn',
      editing: false,
    },
    {
      id: '5',
      item: 'Item 5',
      category: 'B',
      severity: 'info',
      editing: false,
    },
  ];

  const [entries, setEntries] = useState<Entry[]>(initialEntries);

  const updateEntry = (newEntry: Entry) => {
    setEntries((x) =>
      x.map((oldEntry) => {
        return oldEntry.id === newEntry.id ? newEntry : oldEntry;
      })
    );
  };

  const deleteEntry = (entry: Entry) => {
    setEntries((x) => x.filter((y) => y.id !== entry.id));
  };

  const severityTemplate = (entry: Entry) => (
    <KSeverityBadge severity={entry.severity} />
  );

  const ItemTemplate = (entry: Entry) => {
    return entry.editing ? (
      <KInputText
        value={entry.item}
        onChange={(e) => updateEntry({ ...entry, item: e.target.value })}
      />
    ) : (
      <KText>{entry.item}</KText>
    );
  };

  const CategoryTemplate = (entry: Entry) => {
    return entry.editing ? (
      <KInputDropdown
        options={['A', 'B']}
        value={entry.category}
        onChange={(e) => updateEntry({ ...entry, category: e.target.value })}
      />
    ) : (
      <KText>{entry.category}</KText>
    );
  };

  const actionsTemplate = (entry: Entry) => {
    const onStartEditing = () => {
      updateEntry({ ...entry, editing: true });
    };

    const onSave = () => {
      updateEntry({ ...entry, editing: false });
    };

    const onDelete = () => deleteEntry(entry);

    return (
      <div className="flex gap-6">
        {entry.editing ? (
          <KInteractiveIcon
            tooltipLabel="Save"
            icon={<Check />}
            onClick={onSave}
          />
        ) : (
          <KInteractiveIcon
            tooltipLabel="Edit"
            icon={<Edit />}
            onClick={onStartEditing}
          />
        )}
        <KInteractiveIcon
          tooltipLabel="Delete"
          icon={<Delete />}
          onClick={onDelete}
        />
      </div>
    );
  };

  return (
    <ExampleWrapper>
      <KDataTable value={entries}>
        <KColumn header="Item" body={ItemTemplate} />
        <KColumn header="Category" body={CategoryTemplate} />
        <KColumn header="Severity" body={severityTemplate} />
        <KColumn header="Actions" body={actionsTemplate} />
      </KDataTable>
    </ExampleWrapper>
  );
}
