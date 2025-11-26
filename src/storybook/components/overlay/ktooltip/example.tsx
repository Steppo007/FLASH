import { KButton } from '@root/src/components/button/kbutton';
import { KTooltip, KTooltipProps } from '@root/src/components/overlay/ktooltip';
import { useRef } from 'react';

export function Example(props: KTooltipProps) {
  const elementRef = useRef(null);
  const label =
    props.event === 'hover'
      ? 'Hover me'
      : props.event === 'focus'
        ? 'Focus me'
        : 'Either Hover or Focus Me';
  return (
    <>
      <KButton ref={elementRef} label={label} />
      <KTooltip target={elementRef} {...props} />
    </>
  );
}
