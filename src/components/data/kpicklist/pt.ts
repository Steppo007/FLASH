import { ButtonPassThroughOptions } from 'primereact/button';
import { PickListPassThroughOptions } from 'primereact/picklist';
import { getKButtonPTOptions } from '../../button/kbutton/pt';

export function getKPickListPTOptions(): PickListPassThroughOptions {
  const buttonPt: ButtonPassThroughOptions = getKButtonPTOptions({});

  return {
    root: () => 'kro-kpicklist',
    header: () => 'kro-ktext type-lead',
    list: () => 'kro-outline-when-focus-visible',
    moveUpButton: buttonPt,
    moveDownButton: buttonPt,
    moveTopButton: buttonPt,
    moveBottomButton: buttonPt,
    moveToSourceButton: buttonPt,
    moveAllToSourceButton: buttonPt,
    moveToTargetButton: buttonPt,
    moveAllToTargetButton: buttonPt,
  };
}
