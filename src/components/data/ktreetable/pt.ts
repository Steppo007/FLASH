import type {
  TreeTablePassThroughMethodOptions,
  TreeTablePassThroughOptions,
} from 'primereact/treetable';
import { getKPaginatorPTOptions } from '../../misc/kpaginator';
import { classNames } from 'primereact/utils';
import { getKCheckboxPTOptions } from '../../form/kcheckbox/pt';
import { getKRadioButtonPTOptions } from '../../form/kradiobutton/pt';

/**
 * @returns the Primereact pass-through options which make the
 * Primereact TreeTable component take the form of the Krones KTreeTable component.
 */
export function getKTreeTablePTOptions(): TreeTablePassThroughOptions {
  return {
    root: (options: TreeTablePassThroughMethodOptions) =>
      classNames('kro-ktreetable', {
        showgridlines: options.props?.showGridlines,
      }),

    paginator: getKPaginatorPTOptions(),
    column: {
      headerCell: (options) =>
        classNames({
          'sortable-column': options?.props?.sortable,
        }),
      bodyCell: (options) =>
        classNames({
          'selectable-cell': options?.props?.selectionMode != null,
        }),
      rowCheckbox: {
        root: getKCheckboxPTOptions({}).root,
      },
      headerCheckbox: {
        root: getKCheckboxPTOptions({}).root,
      },
      rowRadioButton: {
        root: getKRadioButtonPTOptions({}).root,
      },
    },
  };
}
