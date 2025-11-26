import type { TreeTableProps } from 'primereact/treetable';
import type { ColumnProps } from 'primereact/column';

export type KTreeTableProps = TreeTableProps;
export type KColumnProps = Omit<ColumnProps, 'pt' | 'unstyled'>;
