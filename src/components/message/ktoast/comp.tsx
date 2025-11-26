import { Toast } from 'primereact/toast';
import { KToastProps } from '.';
import { forwardRef } from 'react';
import { classNames } from 'primereact/utils';

export const KToast = forwardRef<Toast, KToastProps>(
  ({ className, ...props }, ref) => {
    const cn = classNames(className, 'kro-ktoast');
    return <Toast className={cn} ref={ref} {...props} />;
  }
);

KToast.displayName = 'KToast';
