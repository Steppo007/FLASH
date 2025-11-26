import { useRef } from 'react';
import { KTooltip } from '../../overlay/ktooltip';
import { KInteractiveIconProps } from '.';

export function KInteractiveIcon({
  icon,
  tooltipLabel = '',
  tooltipPosition = 'top',
  size = 'default',
  ...props
}: KInteractiveIconProps) {
  const elementRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <button
        className={`kro-kinteractiveicon size-${size} kro-cursor-when-enabled kro-outline-when-focused`}
        ref={elementRef}
        {...props}
      >
        {icon}
        {tooltipLabel && (
          <KTooltip
            event="both"
            target={elementRef}
            content={tooltipLabel}
            position={tooltipPosition}
          />
        )}
      </button>
    </>
  );
}
