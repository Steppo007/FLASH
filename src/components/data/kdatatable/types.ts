import { DataTableProps, DataTableValueArray } from 'primereact/datatable';
import { ColumnProps } from 'primereact/column';
export type KDataTableProps<TValue extends DataTableValueArray> =
  DataTableProps<TValue>;
export type KColumnProps = Omit<ColumnProps, 'pt' | 'unstyled'>;
