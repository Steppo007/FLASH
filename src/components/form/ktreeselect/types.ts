import { TreeSelectProps } from 'primereact/treeselect';
import { IFloatLabel, IHelperText } from '../../utils/interfaces';

export interface KTreeSelectProps
  extends Omit<TreeSelectProps, 'size'>,
    IFloatLabel,
    IHelperText {
  size: 'small' | 'default' | 'large';
}
