import { ReactDivProps } from '../../utils/reactProps';

export type KBadgeVariant = 'filled' | 'outlined';
export type KBadgeSize = 'xsmall' | 'small' | 'large';
export type KBadgeSeverity = 'subdued' | 'warning' | 'danger';

export interface KBadgeProps extends ReactDivProps {
  /**
   * the text contained inside the badge
   */
  label?: string;
  /**
   * the size of the badge
   */
  size?: KBadgeSize;
  /**
   * the semantic attribute which determines the color of the badge and its text
   */
  severity?: KBadgeSeverity;
  /**
   * The variant of the badge. The outlined variant simply has a thin border, and the filled variant has no border.
   */
  variant?: KBadgeVariant;
}
