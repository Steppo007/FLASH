import { DropdownProps } from 'primereact/dropdown';
import { KInputSize } from '../kinputtext';
import { IFloatLabel, IHelperText } from '../../utils/interfaces';

export interface KInputDropdownProps
  extends Omit<DropdownProps, 'pt' | 'unstyled' | 'size' | 'focusOnHover'>,
    IFloatLabel,
    IHelperText {
  /**
   * The size of the input dropdown
   * @defaultValue default
   */
  size?: KInputSize;
}
