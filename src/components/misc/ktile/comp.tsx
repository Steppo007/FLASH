import { KText } from '../ktext';
import { KTileProps } from './types';
import { classNames } from 'primereact/utils';

/**
 * Returns a KTile component
 */
export function KTile({
  label,
  children,
  view = 'tile',
  greyedOut = false,
  className,
  ...props
}: KTileProps) {
  const cn = classNames(
    `view-${view}`,
    'kro-ktile',
    { 'kro-ktile-grey': greyedOut },
    className
  );
  return (
    <div className={cn} {...props}>
      <div className="kro-ktile-content">{children}</div>
      <KText title={label} className="kro-line-clamp-2" type="text-sm">
        {label}
      </KText>
    </div>
  );
}
