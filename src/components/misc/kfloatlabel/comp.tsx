import { ReactLabelProps } from '../../utils/reactProps';
import { classNames } from 'primereact/utils';

/**
 * This component is exactly like a label, only that it adds a single class name
 */
export function KFloatLabel({ className, ...props }: ReactLabelProps) {
  const cn = classNames(className, 'kro-kfloatlabel', 'kro-line-clamp-1');
  return <label className={cn} {...props} />;
}
