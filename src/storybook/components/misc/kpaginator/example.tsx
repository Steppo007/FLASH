import { KPaginator } from '@root/src/components/misc/kpaginator';
import { PaginatorPageChangeEvent } from 'primereact/paginator';
import { useState } from 'react';

export function Example() {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <KPaginator
      first={first}
      rows={rows}
      totalRecords={120}
      rowsPerPageOptions={[10, 20, 30]}
      onPageChange={onPageChange}
    />
  );
}
