import { CalendarProps, CalendarSelectionMode } from 'primereact/calendar';
import { IFloatLabel, IHelperText } from '../../utils/interfaces';

export type KCalendarSize = 'default' | 'small';

export interface KCalendarProps<
  TMode extends CalendarSelectionMode,
  TValue extends CalendarValue<TMode>,
> extends IHelperText,
    IFloatLabel,
    CalendarProps<TMode, TValue> {
  /**
   * The size of the input component
   */
  size?: KCalendarSize;
}

export type CalendarValue<TMode extends CalendarSelectionMode> =
  TMode extends 'multiple'
    ? Date[]
    : TMode extends 'range'
      ? (Date | null)[]
      : Date;
