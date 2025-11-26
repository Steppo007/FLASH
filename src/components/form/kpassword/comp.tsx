import React from 'react';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { KInputContainer } from '../kinputcontainer';
import KFloatLabel from '../../misc/kfloatlabel';
import { KHelperText } from '../../misc/khelpertext/comp';
import useIdOrFallback from '../../utils/useIdOrFallback';
import { getKroClassNames } from '../../utils/kroClassNames';

import { KPasswordProps } from './types';

export const KPassword = React.forwardRef<HTMLInputElement, KPasswordProps>(
  (props, ref) => {
    const {
      size = 'default',
      helperText,
      floatLabel: label,
      id,
      className,
      ...propsForInput
    } = props;

    const { invalid, disabled, value, placeholder } = propsForInput;
    const filled = (value !== undefined && value !== '') || !!placeholder;
    const inputId = useIdOrFallback(id);

    const inputClassName = classNames(
      'kro-kpassword kro-kinput',
      getKroClassNames({ size, disabled, invalid, filled })
    );

    return (
      <KInputContainer className={className}>
        <Password
          id={inputId}
          inputRef={ref}
          className={inputClassName}
          {...propsForInput}
        />
        <KFloatLabel htmlFor={inputId}>{label}</KFloatLabel>
        <KHelperText htmlFor={inputId}>{helperText}</KHelperText>
      </KInputContainer>
    );
  }
);

KPassword.displayName = 'KPassword';
