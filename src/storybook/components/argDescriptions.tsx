/*
An object containing property descriptions for agruments which
1) appear in the comp.stories.tsx files
2) are not self-defined, i.e. they come from PrimeReact or Javascript API
3) are used enough times to warrant a centralised definition
*/
export const argDescriptions = {
  disabled: {
    disabled: {
      description: 'whether or not the element is disabled',
    },
  },
  invalid: {
    invalid: {
      description:
        'whether or not the input element should display an invalid status',
    },
  },
  placeholder: {
    placeholder: {
      description: 'placeholder text for the input field',
    },
  },

  filterInputAutoFocus: {
    filterInputAutoFocus: {
      if: { arg: 'filter', truthy: true },
      description:
        'Whether the filter field should be put on focus automatically when the selector is entered',
    },
  },
};
