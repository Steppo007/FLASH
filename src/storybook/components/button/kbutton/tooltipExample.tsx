import { KButton } from '@root/src/components/button/kbutton';
import { ExampleWrapper } from '@root/src/storybook/utils';

export function TooltipExample() {
  return (
    <ExampleWrapper className="flex justify-center">
      <KButton
        tooltip="Tooltip text"
        label={'Hover and Wait'}
        tooltipOptions={{ position: 'top', showDelay: 1000 }}
      />
    </ExampleWrapper>
  );
}
