import React from 'react';
import { KInputText } from '../kinputtext';
import { classNames } from 'primereact/utils';
import useIdOrFallback from '../../utils/useIdOrFallback';
import { getKroClassNames } from '../../utils/kroClassNames';

import { KInputGroupProps } from './types';

export const KInputGroup = React.forwardRef<HTMLInputElement, KInputGroupProps>(
  (props, ref) => {
    const { id, prependText, appendText, className, ...propsForInput } = props;

    const { invalid, disabled, value, placeholder, size } = propsForInput;
    const filled = (value !== undefined && value !== '') || !!placeholder;
    const inputId = useIdOrFallback(id);

    const inputClassName = classNames(
      getKroClassNames({ size, disabled, invalid, filled }),
      {
        'kro-kinputgroup-input-prepend': !!prependText,
        'kro-kinputgroup-input-append': !!appendText,
      }
    );

    const cn = classNames('kro-kinputgroup', className, {
      'kro-invalid': invalid,
    });

    return (
      <div className={cn}>
        {prependText && (
          <span
            className={classNames(
              'kro-kinputgroup-prepend',
              `kro-size-${size || 'default'}`
            )}
          >
            {prependText}
          </span>
        )}
        <KInputText
          id={inputId}
          ref={ref}
          className={inputClassName}
          {...propsForInput}
        />
        {appendText && (
          <span
            className={classNames(
              'kro-kinputgroup-append',
              `kro-size-${size || 'default'}`
            )}
          >
            {appendText}
          </span>
        )}
      </div>
    );
  }
);

KInputGroup.displayName = 'KInputGroup';
