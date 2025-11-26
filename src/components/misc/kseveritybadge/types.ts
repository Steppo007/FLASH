import { ReactDivProps } from '../../utils/reactProps';
import { KSeverity } from '../kseverityicon';

export interface KSeverityBadgeProps extends ReactDivProps {
  severity: KSeverity;
}
