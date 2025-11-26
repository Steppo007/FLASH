import { KAvatarProps } from './types';
import { classNames } from 'primereact/utils';

/**
 * returns a KAvatar component
 */
export function KAvatar({
  size = 'normal',
  label,
  imageUrl,
  icon,
  children,
  className,
  alt,
  ...props
}: KAvatarProps) {
  const cn = classNames(`size-${size}`, 'kro-kavatar', className);

  // image > label > icon
  let content: React.ReactNode = <></>;
  if (icon) content = icon;
  if (label) content = <label>{label}</label>;
  if (imageUrl) content = <img src={imageUrl} alt={alt ?? 'avatar'}></img>;

  return (
    <div className={cn} {...props}>
      {content}
      {children}
    </div>
  );
}
