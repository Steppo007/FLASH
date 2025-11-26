import { ButtonProps } from 'primereact/button';
import { KIconPos } from '../../utils/kroClassNames';

export type KButtonVariant = 'primary' | 'outlined' | 'subdued';
export type KButtonSize = 'small' | 'default' | 'large' | 'xlarge';

export interface KButtonBaseProps extends Omit<ButtonProps, 'size'> {
  /**
   * The size of the button.
   */
  size?: KButtonSize;
  /**
   * The variant of the button.
   */
  variant?: KButtonVariant;
  /**
   * The variant of the button.
   */
  critical?: boolean;
}

export interface KButtonProps extends KButtonBaseProps {
  /**
   * The position of the icon.
   */
  iconPos?: KIconPos;
}
