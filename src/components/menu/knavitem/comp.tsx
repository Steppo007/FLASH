import { KNavItemProps } from '.';
import { classNames } from 'primereact/utils';

/**
 * Returns a KNavItem component.
 */
export function KNavItem({
  className,
  label,
  icon,
  iconEnd,
  children,
  positionBadge = false,
  iconPos = 'left',
  isHighlighted = false,
  ...props
}: KNavItemProps) {
  const cn = classNames(
    'kro-knavitem',
    'kro-outline-when-focus-visible',
    `iconpos-${iconPos}`,
    {
      'position-badge': positionBadge,
      'is-highlighted': isHighlighted,
      'has-no-label': !label,
    },
    className
  );
  return (
    <button className={cn} {...props}>
      {icon}
      {label}
      {children}
      {iconEnd}
    </button>
  );
}
