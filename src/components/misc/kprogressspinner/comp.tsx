import { ProgressSpinner } from 'primereact/progressspinner';
import { KProgressSpinnerProps } from '.';
import { classNames } from 'primereact/utils';

export function KProgressSpinner({
  size = 'default',
  strokeWidth = 6,
  animationDurationMillis = 1000,
}: KProgressSpinnerProps) {
  const cn = classNames('kro-kprogressspinner', `kro-size-${size}`);
  const animDuration = `${animationDurationMillis}ms`;
  return (
    <ProgressSpinner
      className={cn}
      strokeWidth={strokeWidth.toString()}
      animationDuration={animDuration}
    />
  );
}
