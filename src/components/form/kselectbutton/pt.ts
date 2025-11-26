import { SelectButtonPassThroughMethodOptions } from 'primereact/selectbutton';
import { classNames } from 'primereact/utils';

export function getKSelectButtonPTOptions() {
  return {
    root: {
      className: 'kro-kselectbutton',
    },
    button: (options: SelectButtonPassThroughMethodOptions) => ({
      className: classNames({ selected: options.context.selected }),
    }),
    label: {
      className: 'kro-kselectbutton-button-container',
    },
  };
}
