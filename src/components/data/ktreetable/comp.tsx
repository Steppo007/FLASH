import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import type { KColumnProps, KTreeTableProps } from './types';
import { getKTreeTablePTOptions } from './pt';

/**
 * Returns a KTreeTable component with pre-configured styling via PT options.
 */
export function KTreeTable(props: KTreeTableProps) {
  const ptOptions = getKTreeTablePTOptions();

  return <TreeTable {...props} pt={ptOptions} showGridlines />;
}

/**
 * Returns a KTreeTableColumn component.
 */
export function KTreeTableColumn(props: KColumnProps) {
  return <Column {...props} />;
}
