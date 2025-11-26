import { useState } from 'react';
import { Product, products } from './virtualScroll';
import {
  VirtualScrollerLazyEvent,
  VirtualScrollerProps,
} from 'primereact/virtualscroller';
import { KColumn, KDataTable } from '@root/src/components/data/kdatatable';
import { ExampleWrapper } from '@root/src/storybook/utils';

export function LazyScrollExample() {
  const [data, setData] = useState<Product[]>(Array.from({ length: 1000 }));
  const virtualScrollerOptions: VirtualScrollerProps = {
    lazy: true,
    itemSize: 52,
    onLazyLoad: (event: VirtualScrollerLazyEvent) => {
      const first = event.first as number;
      const last = event.last as number;

      // don't need to do anything if all of these have been loaded already
      if (data.slice(first, last).every((x) => !!x)) return;

      // artificial delay to mimic loading of that section of the table
      setTimeout(
        () => {
          setData((data) => {
            const newData = [...data];
            const loadedProducts = products.slice(first, last);
            newData.splice(first, last - first, ...loadedProducts);
            return newData;
          });
        },
        Math.random() * 1000 + 250
      );
    },
  };

  return (
    <ExampleWrapper>
      <KDataTable
        value={data}
        tableStyle={{ minWidth: '50rem' }}
        scrollHeight="25rem"
        stripedRows
        scrollable
        virtualScrollerOptions={virtualScrollerOptions}
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
