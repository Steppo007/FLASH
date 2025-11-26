import { classNames } from 'primereact/utils';
import { KSeverityBadgeProps } from '.';
import { errorSvg, warnSvg } from './svgs';

export function KSeverityBadge(props: KSeverityBadgeProps) {
  let severityIcon = null;

  switch (props.severity) {
    case 'error':
      severityIcon = errorSvg;
      break;
    case 'warn':
    case 'info':
      severityIcon = warnSvg;
      break;
  }

  const cn = classNames(
    'kro-kseveritybadge',
    `kro-severity-${props.severity}`,
    props.className
  );

  return (
    <div {...props} className={cn}>
      {severityIcon}
    </div>
  );
}
