import { DataTable, DataTableValueArray } from 'primereact/datatable';
import { KColumnProps } from '.';
import { KDataTableProps } from '.';
import { Column } from 'primereact/column';
import { getKDataTablePTOptions } from '.';

/**
 * Returns a KDataTable component.
 */
export function KDataTable<TValue extends DataTableValueArray>({
  ...props
}: KDataTableProps<TValue>) {
  return <DataTable {...props} pt={getKDataTablePTOptions<TValue>()} />;
}

/**
 * Returns a KColumn component.
 */
export function KColumn({ ...props }: KColumnProps) {
  return <Column {...props} />;
}
