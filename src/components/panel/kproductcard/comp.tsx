import { KProductCardProps } from './types';
import { classNames } from 'primereact/utils';
import { KText } from '../../misc/ktext';

/**
 * returns a KProductCard react component
 */
export function KProductCard({
  title,
  header,
  footer,
  body,
  className,
  ...props
}: KProductCardProps) {
  return (
    <div className={classNames(className, 'kro-kproductcard')} {...props}>
      <div className="kro-kproductcard-header">{header}</div>
      <div className="kro-kproductcard-body">
        <KText className="kro-line-clamp-2" type="h3">
          {title}
        </KText>
        <KText className="kro-line-clamp-5" type="text-sm">
          {body}
        </KText>
        <div className="kro-kproductcard-footer">{footer}</div>
      </div>
    </div>
  );
}
