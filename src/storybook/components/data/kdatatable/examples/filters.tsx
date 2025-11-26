import { KColumn, KDataTable } from '@root/src/components/data/kdatatable';
import { DataTableFilterMeta } from 'primereact/datatable';
import { useState } from 'react';
import { books, yearMapper } from './basic';
import { FilterMatchMode } from 'primereact/api';
import { ColumnFilterElementTemplateOptions } from 'primereact/column';
import { ExampleWrapper } from '@root/src/storybook/utils';
import KInputText from '@root/src/components/form/kinputtext';
import KInputDropdown from '@root/src/components/form/kinputdropdown';

export function FiltersExample() {
  // Each filter field has a value and a "match mode"
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    title: { value: null, matchMode: FilterMatchMode.CONTAINS },
    author: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  // helper function to update the value of a filter field
  const updateFilterField = (field: string, value: string) => {
    setFilters((oldFilters) => ({
      ...oldFilters,
      [field]: { ...oldFilters[field], value },
    }));
  };

  // input text field for the title column
  const titleFilter = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <KInputText
        value={options.value ?? ''}
        onChange={(e) => options.filterApplyCallback(e.target.value)}
      />
    );
  };

  // dropdown for the author column
  const authorFilter = (options: ColumnFilterElementTemplateOptions) => {
    const dropdownOptions = [
      'William Shakespeare',
      'William Faulkner',
      'Virginia Woolf',
      'Leo Tolstoy',
      'Homer',
      'Fyodor Dostoevsky',
      'Gabriel García Márquez',
      'Franz Kafka',
    ];

    return (
      <KInputDropdown
        options={dropdownOptions}
        value={options.value ?? ''}
        onChange={(e) => options.filterApplyCallback(e.target.value)}
        className="w-36"
      />
    );
  };

  // header containing input for global filter
  const header = () => {
    const value = (filters.global as { value: string }).value ?? '';
    return (
      <div className="flex items-center justify-end p-4">
        <KInputText
          value={value}
          onChange={(e) => updateFilterField('global', e.target.value)}
        />
      </div>
    );
  };

  return (
    <ExampleWrapper>
      <KDataTable
        value={books}
        scrollHeight="30rem"
        scrollable
        filterDisplay="row"
        filterDelay={0}
        globalFilterFields={['title', 'author']}
        emptyMessage="No books to display."
        filters={filters}
        header={header}
      >
        <KColumn
          header="Title"
          field="title"
          filter
          filterElement={titleFilter}
          showFilterMenu={false}
          style={{ minWidth: '10rem' }}
        />
        <KColumn
          header="Author"
          field="author"
          filter
          filterElement={authorFilter}
          showFilterMenu={false}
          style={{ minWidth: '15rem' }}
        />
        <KColumn
          header="Year Published"
          field="year"
          body={yearMapper}
          style={{ minWidth: '10rem' }}
        />
        <KColumn
          header="Number of Pages"
          field="pages"
          style={{ minWidth: '10rem' }}
        />
      </KDataTable>
    </ExampleWrapper>
  );
}
