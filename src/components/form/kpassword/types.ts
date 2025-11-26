import type { PasswordProps } from 'primereact/password';
import type {
  IFloatLabel,
  IHelperText,
  IInvalid,
} from '../../utils/interfaces';

export type KInputSize = 'small' | 'default' | 'large';

export interface KPasswordProps
  extends Omit<PasswordProps, 'size' | 'ref'>, // inherit everything from PrimeReact
    IFloatLabel,
    IHelperText,
    IInvalid {
  /**
   * The size of the password component
   */
  size?: KInputSize;
}
