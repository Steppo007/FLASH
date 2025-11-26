import { SyntheticEvent } from 'react';
import { SelectItemOptionsType } from 'primereact/selectitem';

export interface KActionSelectorProps {
  options: SelectItemOptionsType;
  value: string;
  onSelectValue: (value: string) => void;
  buttonUrl?: string;
  buttonCommand?: (e: SyntheticEvent<HTMLAnchorElement>) => void;
  buttonDisabled?: boolean;
  className?: string;
  noBoundaryStyling?: boolean;
  buttonLabel: string;
  overlayHint?: string;
  overlayHeader?: string;
  label?: string;
}
