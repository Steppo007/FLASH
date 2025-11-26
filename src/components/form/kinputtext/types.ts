import { KTooltipPosition } from '../../overlay/ktooltip';
import { IFloatLabel, IHelperText, IInvalid } from '../../utils/interfaces';
import { ReactInputProps } from '../../utils/reactProps';

export type KInputSize = 'small' | 'default' | 'large';

export interface KInputTextProps
  extends Omit<ReactInputProps, 'size'>,
    IFloatLabel,
    IHelperText,
    IInvalid {
  /**
   * The size of the input text component
   */
  size?: KInputSize;
  /**
   * A tooltip to display on hover
   */
  tooltipLabel?: string;
  /**
   * On which side of the input to show the tooltip
   */
  tooltipPosition?: KTooltipPosition;
}
