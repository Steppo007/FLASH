import { SelectItemOptionsType } from 'primereact/selectitem';

export interface KSelectListProps<
  TMode extends KSelectListSelectionMode,
  TValue = TMode extends 'multiple' ? string[] : string,
> extends KBaseSelectListProps {
  /**
   * Specifies the selection mode either "single" or "multiple".
   * @defaultValue single
   */
  selectionMode?: TMode;
  /**
   * The value of the component.
   */
  value: TValue;
  /**
   * The callback to invoke when value changes.
   */
  onSelect?: (value: TValue) => void;
}

export interface KBaseSelectListProps {
  /**
   * The header of the List. Can be used to select/deselect all in selection mode "multiple".
   */
  header?: string;
  /**
   * The selectable options.
   */
  options: SelectItemOptionsType;
}

export type KSelectListSelectionMode = 'single' | 'multiple';
