import { InputTextareaProps } from 'primereact/inputtextarea';
import { IFloatLabel, IHelperText, IInvalid } from '../../utils/interfaces';

export interface KInputTextareaProps
  extends InputTextareaProps,
    IFloatLabel,
    IHelperText,
    IInvalid {}
