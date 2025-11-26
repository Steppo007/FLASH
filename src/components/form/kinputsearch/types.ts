import { AutoCompleteProps } from 'primereact/autocomplete';
import { IFloatLabel, IHelperText } from '../../utils/interfaces';
import { KInputSize } from '../kinputtext';

export interface KInputSearchProps
  extends Omit<
      AutoCompleteProps,
      | 'pt'
      | 'unstyled'
      | 'size'
      | 'multiple' // not supporting multiple selection right now
      | 'dropdown' // not supporting dropdown right now
    >,
    IFloatLabel,
    IHelperText {
  /**
   * The size of the input text component
   */
  size?: KInputSize;
}
