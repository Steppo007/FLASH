import {
  KColumn,
  KDataTable,
  KDataTableProps,
} from '@root/src/components/data/kdatatable';
import { DataTableProps, DataTableValueArray } from 'primereact/datatable';
import { useState } from 'react';
import { Book, books, yearMapper } from './basic';

export function StoryExample({
  size,
  showGridlines,
  stripedRows,
  sortMode,
  selectionMode,
  removableSort,
  metaKeySelection,
  scrollable,
}: KDataTableProps<DataTableValueArray>) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const selectionProps: DataTableProps<DataTableValueArray> = selectionMode
    ? {
        selectionMode:
          selectionMode === 'radiobutton'
            ? null
            : selectionMode === 'checkbox'
              ? null
              : selectionMode,
        selection: selectedBook,
        onSelectionChange: (e) => {
          setSelectedBook(e.value as Book);
        },
      }
    : {};

  return (
    <KDataTable
      value={books}
      scrollHeight="30rem"
      {...selectionProps}
      {...{
        size,
        showGridlines,
        stripedRows,
        sortMode,
        removableSort,
        metaKeySelection,
        scrollable,
      }}
    >
      {selectionMode === 'radiobutton' && <KColumn selectionMode="single" />}
      {selectionMode === 'checkbox' && <KColumn selectionMode="multiple" />}
      <KColumn header="Title" field="title" sortable={!!sortMode} />
      <KColumn header="Author" field="author" sortable={!!sortMode} />
      <KColumn
        header="Year Published"
        field="year"
        body={yearMapper}
        sortable={!!sortMode}
      />
      <KColumn header="Number of Pages" field="pages" sortable={!!sortMode} />
    </KDataTable>
  );
}
