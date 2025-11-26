import { KColumn, KDataTable } from '@root/src/components/data/kdatatable';
import { ExampleWrapper } from '@root/src/storybook/utils';
import booksJson from './books.json';

export interface Book {
  author: string;
  pages: number;
  title: string;
  year: number;
}

export const yearMapper = (book: Book) => {
  if (book.year < 0) return (-book.year).toString() + ' B.C.';
  else return book.year;
};

export const books = booksJson as Book[];

export function BasicExample() {
  return (
    <ExampleWrapper>
      <KDataTable
        value={books}
        scrollable
        scrollHeight="30rem"
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
