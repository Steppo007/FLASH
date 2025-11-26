import { forwardRef } from 'react';
import { KButtonProps } from '.';
import { getKButtonPTOptions } from './pt';
import { Button } from 'primereact/button';
import { getKTooltipPTOptions } from '../../overlay/ktooltip';

/**
 * Returns a KButton component.
 */

export const KButton = forwardRef<Button, KButtonProps>((props, ref) => {
  const { variant, size, iconPos, critical, tooltipOptions, ...restProps } =
    props;

  const enrichedTooltipOptions = {
    ...tooltipOptions,
    pt: getKTooltipPTOptions(),
  };

  return (
    <Button
      ref={ref}
      pt={getKButtonPTOptions({ variant, size, iconPos, critical })}
      tooltipOptions={enrichedTooltipOptions}
      {...restProps}
    />
  );
});

KButton.displayName = 'KButton';
