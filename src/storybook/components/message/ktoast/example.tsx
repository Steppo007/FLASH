import { KButton } from '@root/src/components/button/kbutton';
import { KToast } from '@root/src/components/message/ktoast';
import { ExampleWrapper } from '@sbook/utils';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

export function Example() {
  const toast = useRef<Toast>(null);

  const show = () => {
    toast.current?.show({
      severity: 'success',
      summary: 'Response Submitted',
      detail: 'Your submission was successful.',
    });
  };

  return (
    <ExampleWrapper className="relative flex h-96 items-center justify-center">
      <KButton label="Submit" onClick={show} />
      <KToast position="top-right" ref={toast} className="!absolute" />
    </ExampleWrapper>
  );
}
