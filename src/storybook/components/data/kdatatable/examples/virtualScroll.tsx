import { KColumn, KDataTable } from '@root/src/components/data/kdatatable';
import { ExampleWrapper } from '@root/src/storybook/utils';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

export const products: Product[] = Array.from({ length: 1000 }).map((_, i) => ({
  id: i,
  name: `Product ${i}`,
  category: `Category ${i % 5}`,
  price: Math.floor(Math.random() * 1000),
}));

export function VirtualScrollExample() {
  return (
    <ExampleWrapper>
      <KDataTable
        value={products}
        scrollHeight="25rem"
        scrollable
        stripedRows
        tableStyle={{ width: '100%' }}
        virtualScrollerOptions={{ itemSize: 40 }}
      >
        <KColumn field="id" header="ID" style={{ minWidth: '10rem' }} />
        <KColumn field="name" header="Name" style={{ minWidth: '10rem' }} />
        <KColumn
          field="category"
          header="Category"
          style={{ minWidth: '10rem' }}
        />
        <KColumn field="price" header="Price" style={{ minWidth: '10rem' }} />
      </KDataTable>
    </ExampleWrapper>
  );
}
