import { KCalendar } from '@root/src/components/form/kcalendar';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { argDescriptions } from '../../argDescriptions';
import {
  KCalendarMultiple,
  KCalendarRange,
  KCalendarSingle,
} from './calendars';
import { ExampleWrapper } from '@root/src/storybook/utils';
import { getKronesComponentsLocaleBestMatch } from '@complib/utils/localization.ts';

const metaData = {
  title: 'Components/Form/KCalendar',
  component: KCalendar,
  tags: [],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?node-id=4236-13779&t=CrtVJvDTYuZuMoAv-0',
    },
  },
  argTypes: {
    ...argDescriptions.disabled,
    ...argDescriptions.invalid,
    ...argDescriptions.placeholder,
    showIcon: {
      description: 'whether or not to show an icon beside the input field',
      defaultValue: false,
    },
    showButtonBar: {
      description:
        'whether or not to show additional options beneath the calendar',
      defaultValue: false,
    },
    selectionMode: {
      description: 'what kind of date selection is possible',
      options: ['single', 'multiple', 'range'],
      control: { type: 'radio' },
      defaultValue: 'single',
    },
    dateFormat: {
      description: 'format of the date',
      control: { type: 'text' },
    },
    locale: {
      description: 'the locale for the calendar',
      options: ['en-GB', 'de-DE', 'es-ES'],
      control: { type: 'radio' },
      defaultValue: 'en',
    },
    view: {
      description:
        'what kind of date to select - make sure to adjust the date format field accordingly',
      options: ['date', 'month', 'year'],
      control: { type: 'radio' },
      defaultValue: 'date',
    },
    numberOfMonths: {
      description: 'the number of months to display simultaneously',
      control: { type: 'number', min: 1, max: 4, step: 1 },
      defaultValue: 1,
    },
    showTime: {
      description: 'whether to display timepicker',
      defaultValue: false,
    },
    timeOnly: {
      if: { arg: 'showTime', truthy: true },
      description: 'when choosing time, whether to display timepicker only',
      defaultValue: false,
    },
    stepHour: {
      if: { arg: 'showTime', truthy: true },
      description: 'hours to change per step',
      defaultValue: 1,
    },
    stepMinute: {
      if: { arg: 'showTime', truthy: true },
      description: 'minutes to change per step',
      defaultValue: 1,
    },
    showSeconds: {
      if: { arg: 'showTime', truthy: true },
      description: 'when choosing time, if should allow choosing seconds',
      defaultValue: false,
    },
    stepSecond: {
      if: { arg: 'showTime', truthy: true },
      description: 'seconds to change per step',
      defaultValue: 1,
    },
    showMillisec: {
      if: { arg: 'showTime', truthy: true },
      description: 'when choosing time, if should allow choosing milliseconds',
      defaultValue: false,
    },
    stepMillisec: {
      if: { arg: 'showTime', truthy: true },
      description: 'milliseconds to change per step',
      defaultValue: 1,
    },
    hourFormat: {
      if: { arg: 'showTime', truthy: true },
      description: 'when choosing time, specifies 12 or 24 hour format',
      options: ['12', '24'],
      control: { type: 'radio' },
      defaultValue: '24',
    },
    showWeek: {
      description: 'when enabled, calendar will show week numbers.',
      defaultValue: false,
    },
    viewDate: {
      description:
        'date instance whose month and year are used to display the calendar.',
      options: ['now', 'fixed test date'],
      mapping: {
        now: new Date(),
        'fixed test date': new Date('2022-05-01T00:00:00'),
      },
      control: { type: 'radio' },
    },
  },
  render: (args) => {
    const locale = getKronesComponentsLocaleBestMatch(args.locale);
    const props = { ...args, locale };
    let component = undefined;
    switch (args.selectionMode) {
      case 'single':
        component = <KCalendarSingle {...props} />;
        break;
      case 'multiple':
        component = <KCalendarMultiple {...props} />;
        break;
      case 'range':
        component = <KCalendarRange {...props} />;
        break;
      case undefined:
        component = <KCalendarSingle selectionMode="single" {...props} />;
        break;
    }
    return (
      <ExampleWrapper className="flex justify-center">
        {component}
      </ExampleWrapper>
    );
  },
} satisfies Meta<typeof KCalendar>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    floatLabel: 'Pick a date',
    helperText: 'Helper Text',
    placeholder: '',
    invalid: false,
    disabled: false,
    size: 'default',
    showIcon: false,
    showButtonBar: false,
    selectionMode: 'single',
    dateFormat: 'dd.mm.yy',
    locale: 'en-GB',
    numberOfMonths: 1,
    showWeek: false,
    view: 'date',
    showTime: false,
    timeOnly: false,
    hourFormat: '24',
    stepHour: 1,
    stepMinute: 1,
    showSeconds: false,
    stepSecond: 1,
    showMillisec: false,
    stepMillisec: 1,
    viewDate: null,
  },
};
