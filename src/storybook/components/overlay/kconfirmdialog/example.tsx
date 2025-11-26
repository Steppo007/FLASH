import { KButton } from '@root/src/components/button/kbutton';
import { KConfirmDialog } from '@root/src/components/overlay/kconfirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';
import { ExampleWrapper } from '@sbook/utils';

// the following import works with vite-plugin-svgr
import Warning from '@root/assets/svgs/icons/warning.svg?react';

export default function Example() {
  const confirm = () => {
    confirmDialog({
      header: 'Confirmation',
      message: 'Are you sure you want to proceed?',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      icon: <Warning />,
      accept: () => {
        console.log('accepted');
      },
      reject: () => {
        console.log('rejected');
      },
      defaultFocus: 'accept',
    });
  };

  return (
    <ExampleWrapper className="flex items-center justify-center">
      <KConfirmDialog />
      <KButton onClick={confirm} label="Confirm" />
    </ExampleWrapper>
  );
}
