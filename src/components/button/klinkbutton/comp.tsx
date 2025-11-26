import ArrowRight from '../../svg-workaround/ArrowRight';
import { getKroClassNames } from '../../utils/kroClassNames';
import { KLinkButtonProps } from './types';
import { classNames } from 'primereact/utils';
/**
 * Returns a KLinkButton component.
 */
export function KLinkButton({
  showArrow = true,
  size = 'default',
  label,
  className,
  iconEnd,
  ...props
}: KLinkButtonProps) {
  const cn = classNames(
    getKroClassNames({ size, hasIcon: showArrow }),
    'kro-klinkbutton',
    'kro-cursor-when-enabled',
    'kro-outline-when-focused',
    className
  );
  return (
    <button className={cn} {...props}>
      {showArrow && <ArrowRight />}
      {label}
      {iconEnd}
    </button>
  );
}
