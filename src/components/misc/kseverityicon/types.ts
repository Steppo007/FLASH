import { ReactDivProps } from '../../utils/reactProps';

export type KSeverity = (typeof severityTypes)[number];
export type KSeverityIconSize = 'small' | 'default' | 'large';

export const severityTypes = ['info', 'warn', 'error'] as const;

export interface KSeverityIconProps extends ReactDivProps {
  severity: KSeverity;
  icon: React.ReactNode;
  size: KSeverityIconSize;
}
