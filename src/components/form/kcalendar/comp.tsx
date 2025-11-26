import {
  Calendar,
  CalendarPassThroughOptions,
  CalendarSelectionMode,
} from 'primereact/calendar';
import { CalendarValue, KCalendarProps } from '.';
import { ObjectUtils, classNames } from 'primereact/utils';
import { KHelperText } from '../../misc/khelpertext/comp';
import useIdOrFallback from '../../utils/useIdOrFallback';
import KFloatLabel from '../../misc/kfloatlabel';
import { KInputContainer } from '../kinputcontainer';
import { getKButtonPTOptions } from '../../button/kbutton/pt';
import { getKroClassNames } from '../../utils/kroClassNames';

const CalendarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="date-range">
      <path
        id="Vector"
        d="M12.6667 2.66659H12V1.99992C12 1.63325 11.7 1.33325 11.3333 1.33325C10.9667 1.33325 10.6667 1.63325 10.6667 1.99992V2.66659H5.33333V1.99992C5.33333 1.63325 5.03333 1.33325 4.66667 1.33325C4.3 1.33325 4 1.63325 4 1.99992V2.66659H3.33333C2.59333 2.66659 2.00667 3.26659 2.00667 3.99992L2 13.3333C2 14.0666 2.59333 14.6666 3.33333 14.6666H12.6667C13.4 14.6666 14 14.0666 14 13.3333V3.99992C14 3.26659 13.4 2.66659 12.6667 2.66659ZM12.6667 12.6666C12.6667 13.0333 12.3667 13.3333 12 13.3333H4C3.63333 13.3333 3.33333 13.0333 3.33333 12.6666V5.99992H12.6667V12.6666ZM4.66667 7.33325H6V8.66659H4.66667V7.33325ZM7.33333 7.33325H8.66667V8.66659H7.33333V7.33325ZM10 7.33325H11.3333V8.66659H10V7.33325Z"
        fill="white"
      />
    </g>
  </svg>
);

function getKCalendarPTOptions<
  TMode extends CalendarSelectionMode,
  TValue extends CalendarValue<TMode>,
>(props: KCalendarProps<TMode, TValue>): CalendarPassThroughOptions {
  const { size, invalid, disabled, showIcon } = props;
  const filled = ObjectUtils.isNotEmpty(props.value) || !!props.placeholder;
  const kroOutlineWhenFocused = {
    className: 'kro-outline-when-focused',
  };
  return {
    panel: {
      className: 'kro-kcalendar',
      /* see https://github.com/primefaces/primereact/issues/6931 */
      onMouseDown: (e) => {
        e.stopPropagation();
      },
      onMouseUp: (e) => {
        e.stopPropagation();
      },
    },
    input: {
      root: {
        className: classNames(
          'kro-kinput',
          getKroClassNames({
            size,
            invalid,
            disabled,
            filled,
            hasIcon: showIcon,
          })
        ),
      },
    },
    month: kroOutlineWhenFocused,
    year: kroOutlineWhenFocused,
    dayLabel: kroOutlineWhenFocused,
    nextButton: kroOutlineWhenFocused,
    previousButton: kroOutlineWhenFocused,
    monthTitle: kroOutlineWhenFocused,
    yearTitle: kroOutlineWhenFocused,
    incrementButton: kroOutlineWhenFocused,
    decrementButton: kroOutlineWhenFocused,
    dropdownButton: getKButtonPTOptions({ size }),
  };
}

export function KCalendar<
  TMode extends CalendarSelectionMode,
  TValue extends CalendarValue<TMode>,
>(props: KCalendarProps<TMode, TValue>) {
  const {
    floatLabel: label,
    helperText,
    size = 'default',
    className,
    inputId,
    ...calendarProps
  } = props;
  const calendarId = useIdOrFallback(inputId);
  return (
    <KInputContainer className={className}>
      <Calendar<TMode, TValue>
        pt={getKCalendarPTOptions<TMode, TValue>({ size, ...calendarProps })}
        unstyled
        icon={<CalendarIcon />}
        iconPos="right"
        inputId={calendarId}
        {...calendarProps}
      />
      <KFloatLabel htmlFor={calendarId}>{label}</KFloatLabel>
      <KHelperText htmlFor={calendarId}>{helperText}</KHelperText>
    </KInputContainer>
  );
}
