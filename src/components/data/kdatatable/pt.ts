import {
  DataTablePassThroughMethodOptions,
  DataTablePassThroughOptions,
  DataTableValueArray,
} from 'primereact/datatable';
import { getKPaginatorPTOptions } from '../../misc/kpaginator';
import { classNames } from 'primereact/utils';
import { getKCheckboxPTOptions } from '../../form/kcheckbox/pt';
import { getKRadioButtonPTOptions } from '../../form/kradiobutton/pt';

/**
 * @returns the Primereact pass-through options which make the
 * Primereact DataTable component take the form of the Krones KDataTable component.
 */
export function getKDataTablePTOptions<
  Tvalue extends DataTableValueArray,
>(): DataTablePassThroughOptions {
  return {
    root: (options: DataTablePassThroughMethodOptions<Tvalue>) => {
      const className = classNames(
        'kro-kdatatable',
        `size-${options.props.size}`,
        {
          showgridlines: options.props.showGridlines,
        }
      );
      return { className };
    },
    paginator: getKPaginatorPTOptions(),
    column: {
      rowCheckbox: getKCheckboxPTOptions({}),
      headerCheckbox: getKCheckboxPTOptions({}),
      rowRadioButton: getKRadioButtonPTOptions({}),
    },
  };
}
