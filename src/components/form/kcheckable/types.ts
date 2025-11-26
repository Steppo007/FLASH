import { CheckboxProps } from 'primereact/checkbox';
import { InputSwitchProps } from 'primereact/inputswitch';
import { RadioButtonProps } from 'primereact/radiobutton';

export type KCheckableSize = 'small' | 'default';
export interface KCheckableCustomProps {
  /**
   * the label of the checkable item
   */
  label?: string;
  /**
   * the size of the checkable item and label
   */
  size?: KCheckableSize;
  /**
   * whether to show an information icon, and with what text
   */
  infoIconText?: string;
}

export interface KCheckboxProps
  extends KCheckableCustomProps,
    Omit<CheckboxProps, 'size' | 'pt'> {}
export interface KRadioButtonProps
  extends KCheckableCustomProps,
    Omit<RadioButtonProps, 'size' | 'pt'> {}
export interface KInputSwitchProps
  extends KCheckableCustomProps,
    Omit<InputSwitchProps, 'size' | 'pt'> {}

export type KCheckableProps =
  | {
      type: 'checkbox';
      props: KCheckboxProps;
    }
  | {
      type: 'radiobutton';
      props: KRadioButtonProps;
    }
  | {
      type: 'inputswitch';
      props: KInputSwitchProps;
    };
