import { KTooltipPosition } from '../../overlay/ktooltip';
import { ReactButtonProps } from '../../utils/reactProps';
export type KInteractiveIconSize = 'small' | 'default' | 'large';

export interface KInteractiveIconProps extends ReactButtonProps {
  /**
   * the svg to use for the icon
   */
  icon?: React.ReactNode;
  /**
   * the label for the tooltip, appearing when the icon is hovered
   */
  tooltipLabel?: string;
  /**
   * the position of the tooltip relative to the icon
   */
  tooltipPosition?: KTooltipPosition;
  /**
   * the size of the icon
   */
  size?: KInteractiveIconSize;
}
