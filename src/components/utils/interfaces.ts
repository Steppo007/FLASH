export interface IHelperText {
  /**
   * helper text to display below the input field
   */
  helperText?: string;
}

export interface IFloatLabel {
  /**
   * a label to display on the input, which should float to the top when the input is filled
   */
  floatLabel?: string;
}

export interface IInvalid {
  /**
   * whether or not the input element should show an invalid status
   */
  invalid?: boolean;
}
