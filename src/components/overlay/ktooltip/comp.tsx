import { Tooltip, TooltipPassThroughOptions } from 'primereact/tooltip';
import { KTooltipProps } from './types';

export function getKTooltipPTOptions(): TooltipPassThroughOptions {
  return {
    root: {
      className: 'kro-ktooltip',
    },
    text: {
      className: 'kro-ktext type-text-sm kro-ktext-inverse',
    },
  };
}

export function KTooltip(props: KTooltipProps) {
  return <Tooltip {...props} pt={getKTooltipPTOptions()} />;
}
