import { KBadgeProps } from './types';
import { classNames } from 'primereact/utils';

/**
 * returns a KBadge component
 */
export function KBadge({
  label = '',
  severity = 'danger',
  size = 'small',
  variant = 'filled',
  className,
  ...props
}: KBadgeProps) {
  const cn = classNames(
    `variant-${variant}`,
    `size-${size}`,
    `severity-${severity}`,
    'kro-kbadge',
    className
  );
  return (
    <div className={cn} {...props}>
      {label}
    </div>
  );
}
