import { classNames } from 'primereact/utils';
import { ReactDivProps } from '../../utils/reactProps';

export function KInputContainer({ className, ...props }: ReactDivProps) {
  const cn = classNames(className, 'kro-kinputcontainer');
  return <div className={cn} {...props}></div>;
}
