import { KInputTextProps } from '.';
import { ObjectUtils, classNames } from 'primereact/utils';
import {
  KInteractiveIcon,
  KInteractiveIconProps,
} from '../../misc/kinteractiveicon';
import KFloatLabel from '../../misc/kfloatlabel';
import React from 'react';
import useIdOrFallback from '../../utils/useIdOrFallback';
import { KHelperText } from '../../misc/khelpertext/comp';
import { KInputContainer } from '../kinputcontainer';
import { getKroClassNames } from '../../utils/kroClassNames';

const InfoIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="info">
      <path
        id="Vector"
        d="M11 7H13V9H11V7ZM11 11H13V17H11V11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
      />
    </g>
  </svg>
);

/**
 * Returns a KInputText component.
 */
export const KInputText = React.forwardRef<HTMLInputElement, KInputTextProps>(
  (props, ref) => {
    const {
      size = 'default',
      helperText,
      floatLabel: label,
      tooltipLabel,
      tooltipPosition = 'top',
      id,
      className,
      ...propsForInput
    } = props;

    const { invalid, disabled } = propsForInput;
    const filled = ObjectUtils.isNotEmpty(props.value) || !!props.placeholder;

    const inputId = useIdOrFallback(id);
    const inputClassName = classNames(
      'kro-kinputtext kro-kinput',
      getKroClassNames({ size, disabled, invalid, filled })
    );
    const inputProps = {
      id: inputId,
      ref,
      className: inputClassName,
      ...propsForInput,
    };

    const interactiveIconProps: KInteractiveIconProps = {
      disabled,
      icon: <InfoIcon />,
      size,
      tooltipLabel,
      tooltipPosition,
    };

    return (
      <KInputContainer className={className}>
        <input {...inputProps} />
        <KFloatLabel htmlFor={inputId}>{label}</KFloatLabel>
        <KHelperText htmlFor={inputId}>{helperText}</KHelperText>
        {tooltipLabel && <KInteractiveIcon {...interactiveIconProps} />}
      </KInputContainer>
    );
  }
);

KInputText.displayName = 'KInputText';
