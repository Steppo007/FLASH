import { ConfirmDialog } from 'primereact/confirmdialog';
import { KConfirmDialogProps } from './types';
import { getKConfirmDialogPTOptions } from './pt';

export function KConfirmDialog(props: KConfirmDialogProps) {
  return (
    <ConfirmDialog
      maskClassName="kro-kdialog-mask"
      {...props}
      pt={getKConfirmDialogPTOptions()}
    />
  );
}
