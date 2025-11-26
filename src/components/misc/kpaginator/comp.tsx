import { Paginator } from 'primereact/paginator';
import { KPaginatorProps } from './types';
import { getKPaginatorPTOptions } from './pt';

/**
 * Returns a KPaginator component.
 */
export const KPaginator = ({ ...props }: KPaginatorProps) => {
  return <Paginator pt={getKPaginatorPTOptions()} {...props} unstyled />;
};
