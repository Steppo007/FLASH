import { KToast } from '@root/src/components/message/ktoast';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast, ToastMessage } from 'primereact/toast';
import { useRef } from 'react';
import { KButton } from '@root/src/components/button/kbutton';

interface KToastMessageProps extends ToastMessage {
  position?:
    | 'center'
    | 'top-center'
    | 'top-left'
    | 'top-right'
    | 'bottom-center'
    | 'bottom-left'
    | 'bottom-right';
}

/**
 * work around to choose custom parameters for storybook
 * control panel. Some props are passed on to the Toast,
 * and some to the Toast Message.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function KToastMessage(_props: KToastMessageProps) {
  return <></>;
}

const metaData = {
  title: 'Components/Message/KToast',
  component: KToastMessage,
  tags: [],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?node-id=9905-129416&t=77y3aP9t7l55sU3g-0',
    },
  },
  argTypes: {
    position: {
      options: [
        'center',
        'top-center',
        'top-left',
        'top-right',
        'bottom-center',
        'bottom-left',
        'bottom-right',
      ],
      control: { type: 'radio' },
      description: 'Position of the toast in viewport',
    },
    severity: {
      options: ['success', 'info', 'warn', 'error'],
      control: { type: 'radio' },
      description: 'Severity of the message.',
    },
    life: {
      if: { arg: 'sticky', truthy: false },
      control: { type: 'range', min: 1000, max: 5000, step: 1000 },
      description: 'Delay in milliseconds to close the message automatically.',
    },
    sticky: {
      description: 'When enabled, message is not removed automatically.',
    },
    summary: {
      description: 'Summary content of the message.',
    },
    detail: {
      description: 'Detail content of the message.',
    },
  },
  render: ({ position, ...args }) => {
    const toast = useRef<Toast>(null);

    const show = () => {
      toast.current?.show({ ...args });
    };

    return (
      <>
        <KButton size="default" label="Show Message" onClick={show} />
        <KToast position={position} ref={toast} />
      </>
    );
  },
} satisfies Meta<typeof KToastMessage>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    summary: 'Message Title',
    detail: 'A more detailed description of the message.',
    severity: 'success',
    position: 'center',
    sticky: false,
    life: 3000,
  },
};
