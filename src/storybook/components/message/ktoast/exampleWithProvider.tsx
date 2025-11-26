import { KButton } from '@root/src/components/button/kbutton';
import { KToast } from '@root/src/components/message/ktoast';
import KText from '@root/src/components/misc/ktext';
import { KDialog } from '@root/src/components/overlay/kdialog';
import { Toast } from 'primereact/toast';
import { createContext, RefObject, useContext, useRef, useState } from 'react';

import { ExampleWrapper } from '@sbook/utils';

interface ToastContextValue {
  toastRef: RefObject<Toast | null>;
}

const defaultValue: ToastContextValue = {
  toastRef: { current: null },
};

const ToastContext = createContext<ToastContextValue>(defaultValue);

const useToast = () => {
  return useContext(ToastContext);
};

function ToastProvider(props: { children: React.ReactNode }) {
  const toastRef = useRef<Toast>(null);

  return (
    <ToastContext.Provider value={{ toastRef }}>
      {props.children}
      <KToast position="top-right" ref={toastRef} />
    </ToastContext.Provider>
  );
}

function App() {
  const [visible, setVisible] = useState(false);
  const { toastRef } = useToast();

  return (
    <>
      <KButton
        label="Open Dialog"
        onClick={() => {
          setVisible(true);
        }}
      ></KButton>
      <KDialog
        visible={visible}
        onHide={() => {
          setVisible(false);
        }}
        footer={
          <div className="flex w-full items-center justify-end p-4 text-center">
            <KButton
              label="Show Toast"
              onClick={() => {
                toastRef.current?.show({
                  severity: 'success',
                  summary: 'A toast message!',
                  detail: 'This is a sticky toast.',
                  sticky: true,
                });
              }}
            />
          </div>
        }
      >
        <div className="flex max-w-[500px] flex-col gap-4 p-4">
          <KText>
            Using a global toast component via a provider makes sure toasts
            behave correctly, for example when there are modals involved.
          </KText>
          <KText>
            Another advantage of using a shared toast component is that toasts
            from different sources are not placed on top of each other, but are
            interleaved correctly.
          </KText>
        </div>
      </KDialog>
    </>
  );
}

export function ExampleWithProvider() {
  return (
    <ExampleWrapper className="relative flex h-96 items-center justify-center">
      <ToastProvider>
        <App />
      </ToastProvider>
    </ExampleWrapper>
  );
}
