import { classNames } from 'primereact/utils';
import { KSeverity } from '../misc/kseverityicon';
import { KTooltipPosition } from '../overlay/ktooltip';

export const kroSizes = [
  'xsmall',
  'small',
  'default',
  'large',
  'xlarge',
] as const;
export type KSize = (typeof kroSizes)[number];
export type KIconPos = 'left' | 'right';

export interface KroClassNamesProps {
  invalid?: boolean;
  disabled?: boolean;
  filled?: boolean;
  checked?: boolean;
  hasIcon?: boolean;
  critical?: boolean;
  variant?: string;
  tooltipPosition?: KTooltipPosition;
  size?: KSize;
  iconPos?: KIconPos;
  severity?: KSeverity;
}

export function getKroClassNames(props: KroClassNamesProps) {
  return classNames({
    'kro-filled': props.filled,
    'kro-invalid': props.invalid,
    'kro-checked': props.checked,
    'kro-hasicon': props.hasIcon,
    'kro-critical': props.critical,
    'kro-disabled': props.disabled,
    [`kro-size-${props.size}`]: props.size,
    [`kro-variant-${props.variant}`]: props.variant,
    [`kro-iconpos-${props.iconPos}`]: props.iconPos,
    [`kro-severity-${props.severity}`]: props.severity,
  });
}

export function restrictToAllowedValues<T>(
  value: T,
  allowedValues: T[],
  defaultValue: T
) {
  for (const x of allowedValues) {
    if (value === x) return value;
  }
  return defaultValue;
}
