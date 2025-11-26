import { ReactLabelProps } from '../../utils/reactProps';
import { classNames } from 'primereact/utils';

/**
 * This component is exactly like a label, only that it adds some class names
 */
export function KHelperText({ className, ...props }: ReactLabelProps) {
  const cn = classNames(className, 'kro-khelpertext', 'kro-line-clamp-2');
  return <label className={cn} {...props} />;
}
