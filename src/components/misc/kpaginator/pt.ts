import { PaginatorPassThroughOptions } from 'primereact/paginator';
import { getKInputDropdownPTOptions } from '../../form/kinputdropdown';

/**
 * @returns the Primereact pass-through options which make the
 * Primereact Paginator component take the form of the Krones KPaginator component.
 */
export function getKPaginatorPTOptions(): PaginatorPassThroughOptions {
  return {
    root: {
      className: 'kro-kpaginator',
    },
    RPPDropdown: getKInputDropdownPTOptions({}),
  };
}
