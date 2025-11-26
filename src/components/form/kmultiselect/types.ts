import { MultiSelectProps } from 'primereact/multiselect';
import { KInputSize } from '../kinputtext';
import { IFloatLabel, IHelperText } from '../../utils/interfaces';

export interface KMultiSelectProps
  extends Omit<MultiSelectProps, 'size' | 'pt'>,
    IFloatLabel,
    IHelperText {
  size?: KInputSize;
}
