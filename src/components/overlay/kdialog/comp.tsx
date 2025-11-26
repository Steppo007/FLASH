import { Dialog, DialogPassThroughOptions } from 'primereact/dialog';
import { KDialogProps } from '.';

export function getDialogPTOptions(): DialogPassThroughOptions {
  return {
    root: {
      className: 'kro-kdialog',
    },
    mask: {
      className: 'kro-kdialog-mask',
    },
  };
}

export function KDialog(props: KDialogProps) {
  return <Dialog {...props} pt={getDialogPTOptions()} />;
}
