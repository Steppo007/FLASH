import { KButton } from '@root/src/components/button/kbutton';
import KText from '@root/src/components/misc/ktext';
import { KDialog } from '@root/src/components/overlay/kdialog';
import { ExampleWrapper } from '@root/src/storybook/utils';
import { useState } from 'react';

export default function Example() {
  const [isVisible, setIsVisible] = useState(false);

  const dialogFooter = (
    <div className="flex w-64 items-center justify-center p-4 text-center">
      <KText>Put your footer content here.</KText>
    </div>
  );

  const dialogBody = (
    <div className="border-border-default flex h-24 w-64 items-center justify-center border-y p-5 text-center">
      <KText>Put your dialog content here.</KText>
    </div>
  );

  return (
    <ExampleWrapper className="flex items-center justify-center">
      <KButton
        label="Open Dialog"
        onClick={() => {
          setIsVisible(true);
        }}
      />
      <KDialog
        visible={isVisible}
        onHide={() => {
          setIsVisible(false);
        }}
        header="Header"
        footer={dialogFooter}
      >
        {dialogBody}
      </KDialog>
    </ExampleWrapper>
  );
}
