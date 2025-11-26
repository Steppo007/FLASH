import { ConfirmDialogPassThroughOptions } from 'primereact/confirmdialog';
import { getKButtonPTOptions } from '../../button/kbutton/pt';

export function getKConfirmDialogPTOptions(): ConfirmDialogPassThroughOptions {
  return {
    root: {
      className: 'kro-kconfirmdialog kro-kdialog',
    },
    message: {
      className: 'kro-ktext type-text',
    },
    transition: {
      timeout: 300,
    },
    acceptButton: getKButtonPTOptions({
      variant: 'primary',
      size: 'default',
      iconPos: 'left',
    }),
    rejectButton: getKButtonPTOptions({
      variant: 'outlined',
      size: 'default',
      iconPos: 'left',
    }),
  };
}
