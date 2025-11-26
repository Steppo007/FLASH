import { KColumn, KDataTable } from '@root/src/components/data/kdatatable';
import { ExampleWrapper } from '@root/src/storybook/utils';
import { books, yearMapper } from './basic';

export function PaginatorExample() {
  return (
    <ExampleWrapper>
      <KDataTable
        value={books}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 15, 20]}
        tableStyle={{ minWidth: '50rem' }}
      >
        <KColumn header="Title" field="title" />
        <KColumn header="Author" field="author" />
        <KColumn header="Year Published" field="year" body={yearMapper} />
        <KColumn header="Number of Pages" field="pages" />
      </KDataTable>
    </ExampleWrapper>
  );
}
