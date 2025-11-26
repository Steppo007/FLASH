import { forwardRef } from 'react';
import { KIconButtonProps } from '.';
import { getKButtonPTOptions as getKIconButtonPTOptions } from './pt';
import { Button } from 'primereact/button';
import { getKTooltipPTOptions } from '../../overlay/ktooltip';

/**
 * Returns a KIconButton component.
 */

export const KIconButton = forwardRef<Button, KIconButtonProps>(
  (props, ref) => {
    const { variant, size, critical, tooltipOptions, ...restProps } = props;

    const enrichedTooltipOptions = {
      ...tooltipOptions,
      pt: getKTooltipPTOptions(),
    };

    return (
      <Button
        ref={ref}
        pt={getKIconButtonPTOptions({ variant, size, critical })}
        tooltipOptions={enrichedTooltipOptions}
        {...restProps}
      />
    );
  }
);

KIconButton.displayName = 'KIconButton';
