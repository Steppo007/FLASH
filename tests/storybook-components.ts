import { ObjectWithValues } from './utils/jsobjects';

/**
 * information about a component in storybook
 */
export interface StorybookComponent {
  /**
   * the category of the component as in the Krones component library
   */
  category: string;
  /**
   * the name of the component as in the Krones component library
   */
  name: string;
  /**
   * the default props to use for this component. These are just used
   * for testing, and are completely independent from the default values
   * specified in storybook. You should specify default values for ALL
   * the props in the storybook control panel for that component.
   */
  defaultProps: ComponentInstance;
}

export type ComponentInstance = ObjectWithValues<ComponentInstanceValue>;
export type ComponentInstanceValue = string | boolean | undefined | object;
export const defaultComponentInstance: ComponentInstance[] = [{}];

/**
 *
 * LIST OF COMPONENTS
 *
 */
export const kButtonSB: StorybookComponent = {
  category: 'button',
  name: 'kbutton',
  defaultProps: {
    variant: 'primary',
    critical: false,
    size: 'default',
    label: 'Krones',
    badge: '',
    disabled: false,
    icon: 'none',
    iconPos: 'left',
    tooltip: '',
  },
};

export const kLinkButtonSB: StorybookComponent = {
  category: 'button',
  name: 'klinkbutton',
  defaultProps: {
    size: 'small',
    showArrow: true,
    label: 'Krones',
    disabled: false,
  },
};

export const kTileSB: StorybookComponent = {
  category: 'misc',
  name: 'ktile',
  defaultProps: {
    label: 'Krones',
    children: 'comparativeReporting',
    view: 'tile',
  },
};

export const kProductCardSB: StorybookComponent = {
  category: 'panel',
  name: 'kproductcard',
  defaultProps: {
    title: 'Krones Product',
    children:
      'This is a short sum-up of the power and value of having this product or service at your company',
    header: 'none',
    footer: 'none',
  },
};

export const kCheckboxSB: StorybookComponent = {
  category: 'form',
  name: 'kcheckbox',
  defaultProps: {
    size: 'default',
    disabled: false,
    invalid: false,
    label: 'Krones',
    infoIconText: '',
  },
};

export const kRadioButtonSB: StorybookComponent = {
  ...kCheckboxSB,
  name: 'kradiobutton',
};

export const kSideMenuSb: StorybookComponent = {
  category: 'menu',
  name: 'ksidemenu',
  defaultProps: {},
};

export const KActionSelectorSB: StorybookComponent = {
  category: 'form',
  name: 'kactionselector',
  defaultProps: {
    noBoundaryStyling: false,
    buttonLabel: 'Go to',
    label: 'City',
    overlayHeader: 'City selection',
    overlayHint: 'Switch to another city',
  },
};

export const kSelectButtonSB: StorybookComponent = {
  category: 'form',
  name: 'kselectbutton',
  defaultProps: {},
};

export const kSelectListSB: StorybookComponent = {
  category: 'form',
  name: 'kselectlist',
  defaultProps: {
    header: 'Language',
    options: [
      { label: 'English (UK)', value: 'en-GB' },
      { label: 'Deutsch', value: 'de-DE' },
    ],
    value: 'en-GB',
  },
};

export const kMultiPageDialogSB: StorybookComponent = {
  category: 'overlay',
  name: 'kmultipagedialog',
  defaultProps: {
    model: '5 pages',
    footer: 'primary and secondary',
    header: 'Settings',
  },
};

export const kAvatarSB: StorybookComponent = {
  category: 'misc',
  name: 'kavatar',
  defaultProps: {
    size: 'normal',
    label: '',
    imageUrl: 'none',
    icon: 'none',
    children: 'no badge',
  },
};

export const kBadgeSB: StorybookComponent = {
  category: 'misc',
  name: 'kbadge',
  defaultProps: {
    label: '',
    severity: 'danger',
    size: 'small',
    variant: 'filled',
  },
};

export const kTextSB: StorybookComponent = {
  category: 'misc',
  name: 'ktext',
  defaultProps: {
    type: 'text',
    children: 'Krones Digital',
  },
};

export const kInputDropdownSB: StorybookComponent = {
  category: 'form',
  name: 'kinputdropdown',
  defaultProps: {
    size: 'default',
    invalid: false,
    helperText: '',
    floatLabel: '',
    disabled: false,
    showClear: false,
    placeholder: 'Select a City',
    editable: false,
    filter: false,
    filterPlaceholder: 'Search',
    emptyFilterMessage: 'No available options',
  },
};

export const kInputSearchSB: StorybookComponent = {
  category: 'form',
  name: 'kinputsearch',
  defaultProps: {
    size: 'default',
    invalid: false,
    helperText: '',
    floatLabel: 'Type to search ...',
    disabled: false,
    placeholder: '',
  },
};

export const kNavItemSB: StorybookComponent = {
  category: 'menu',
  name: 'knavitem',
  defaultProps: {
    label: '',
    icon: 'none',
    isHighlighted: false,
    iconPos: 'left',
    children: 'no badge',
  },
};

export const kConfirmDialogSB: StorybookComponent = {
  category: 'overlay',
  name: 'kconfirmdialog',
  defaultProps: {
    header: 'Confirmation',
    message: 'Are you sure?',
    icon: 'none',
    acceptLabel: 'Yes',
    rejectLabel: 'No',
  },
};

export const kTabMenuSB: StorybookComponent = {
  category: 'menu',
  name: 'ktabmenu',
  defaultProps: {
    size: 'default',
  },
};

export const kTooltipSB: StorybookComponent = {
  category: 'overlay',
  name: 'ktooltip',
  defaultProps: {
    position: 'top',
    content: 'Tooltip Text',
    event: 'hover',
  },
};

export const kInteractiveIconSB: StorybookComponent = {
  category: 'misc',
  name: 'kinteractiveicon',
  defaultProps: {
    icon: 'info',
    tooltipLabel: 'Tooltip Text',
    tooltipPosition: 'top',
    size: 'default',
    disabled: false,
  },
};

export const kInputTextSB: StorybookComponent = {
  category: 'form',
  name: 'kinputtext',
  defaultProps: {
    disabled: false,
    helperText: '',
    floatLabel: '',
    size: 'default',
    invalid: false,
    placeholder: 'Placeholder',
    tooltip: '',
    tooltipPosition: 'right',
  },
};

export const kToastSB: StorybookComponent = {
  category: 'message',
  name: 'ktoast',
  defaultProps: {
    severity: 'info',
    summary: 'KToast example title',
    details: 'Write your detailed description of the topic here',
    position: 'top-right',
    sticky: true,
  },
};

export const kCalendarSB: StorybookComponent = {
  category: 'form',
  name: 'kcalendar',
  defaultProps: {
    label: 'Label',
    helperText: 'Helper Text',
    invalid: false,
    disabled: false,
    size: 'default',
    showIcon: false,
    showButtonBar: false,
    selectionMode: 'single',
    dateFormat: 'dd.mm.yy',
    locale: 'en',
    numberOfMonths: '1',
    showWeek: false,
    view: 'date',
    showTime: false,
    timeOnly: false,
    hourFormat: '24',
    stepHour: '1',
    stepMinute: '1',
    showSeconds: false,
    stepSecond: '1',
    showMillisec: false,
    stepMillisec: '1',
    viewDate: 'fixed test date',
  },
};

export const kSeverityIconSB: StorybookComponent = {
  category: 'misc',
  name: 'kseverityicon',
  defaultProps: {
    size: 'large',
    severity: 'info',
    icon: 'advancedAnalytics',
  },
};

export const kTagSB: StorybookComponent = {
  category: 'misc',
  name: 'ktag',
  defaultProps: {
    value: 'Label',
    severity: 'info',
    rounded: true,
    icon: 'check',
  },
};

export const kMultiSelectSB: StorybookComponent = {
  category: 'form',
  name: 'kmultiselect',
  defaultProps: {
    size: 'default',
    invalid: false,
    helperText: 'Helper text',
    floatLabel: 'Label',
    disabled: false,
    showClear: false,
    placeholder: 'Select cities',
    filter: false,
    filterPlaceholder: 'Search...',
  },
};

export const kDialogSB: StorybookComponent = {
  category: 'overlay',
  name: 'kdialog',
  defaultProps: {},
};

export const kMegaMenuSB: StorybookComponent = {
  category: 'menu',
  name: 'kmegamenu',
  defaultProps: {},
};

export const kMenuSB: StorybookComponent = {
  category: 'menu',
  name: 'kmenu',
  defaultProps: {
    model: 'basic',
  },
};

export const kSeverityBadgeSB: StorybookComponent = {
  category: 'misc',
  name: 'kseveritybadge',
  defaultProps: {
    severity: 'info',
  },
};

export const kTreeSelectSB: StorybookComponent = {
  category: 'form',
  name: 'ktreeselect',
  defaultProps: {
    size: 'default',
    disabled: false,
    filter: false,
    floatLabel: 'Select...',
    filterPlaceholder: 'Search...',
    helperText: 'Required',
  },
};

export const kInputSwitchSB: StorybookComponent = {
  ...kCheckboxSB,
  name: 'kinputswitch',
};

export const kProgressSpinnerSB: StorybookComponent = {
  category: 'misc',
  name: 'kprogressspinner',
  defaultProps: {
    size: 'default',
    strokeWidth: '6',
    animationDurationMillis: '1000',
  },
};

export const kInputTextareaSB: StorybookComponent = {
  category: 'form',
  name: 'kinputtextarea',
  defaultProps: {
    invalid: false,
    disabled: false,
    placeholder: 'Placeholder',
    floatLabel: 'Label',
    helperText: 'Helper Text',
    rows: '5',
    cols: '50',
  },
};

export const kPickListSB: StorybookComponent = {
  category: 'data',
  name: 'kpicklist',
  defaultProps: {
    filterBy: undefined,
    sourceHeader: 'Available Writers',
    targetHeader: 'Selected Writers',
    showSourceControls: true,
    showTargetControls: true,
  },
};

export const kIconButtonSB: StorybookComponent = {
  category: 'button',
  name: 'kiconbutton',
  defaultProps: {
    variant: 'primary',
    critical: false,
    size: 'default',
    disabled: false,
    badge: '',
    icon: 'none',
    iconPos: 'left',
    tooltip: '',
  },
};

export const kListItemSB: StorybookComponent = {
  category: 'data',
  name: 'klistitem',
  defaultProps: {
    overline: '001',
    headline: 'George Orwell',
    supportingText: 'United Kingdom',
    component: 'button',
  },
};

export const kTreeTableSB: StorybookComponent = {
  category: 'data',
  name: 'ktreetable',
  defaultProps: {
    sortMode: 'single',
    selectionMode: 'single',
    removableSort: false,
    scrollable: true,
  },
};

export const kPasswordSB: StorybookComponent = {
  category: 'form',
  name: 'kpassword',
  defaultProps: {
    size: 'default',
    floatLabel: 'Password',
    helperText: 'Enter your password',
    toggleMask: true,
    disabled: false,
    invalid: false,
  },
};

export const kInputGroupSB: StorybookComponent = {
  category: 'form',
  name: 'kinputgroup',
  defaultProps: {
    disabled: false,
    helperText: '',
    floatLabel: '',
    size: 'default',
    invalid: false,
    placeholder: 'Placeholder',
    tooltip: '',
    tooltipPosition: 'right',
    prependText: '',
    appendText: '@krones.com',
  },
};
