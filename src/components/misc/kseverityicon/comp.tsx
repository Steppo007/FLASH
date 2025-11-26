import { classNames } from 'primereact/utils';
import { KSeverityIconProps } from '.';
import { KSeverityBadge } from '../kseveritybadge';

export function KSeverityIcon({
  size = 'default',
  icon = null,
  severity = 'info',
  className,
  ...divProps
}: KSeverityIconProps) {
  const cn = classNames('kro-kseverityicon', `kro-size-${size}`, className);

  const cornerSeverityIndicator =
    severity === 'info' ? null : <KSeverityBadge severity={severity} />;
  const iconWrapper = (
    <div className="kro-icon">
      {icon}
      {cornerSeverityIndicator}
    </div>
  );

  return (
    <div {...divProps} className={cn}>
      {iconWrapper}
    </div>
  );
}
