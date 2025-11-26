import { KNavItem } from '@root/src/components/menu/knavitem';

// the following import works with vite-plugin-svgr
import OutlinedSettingsGear from '@flash/ui-components/assets/icons/svgs/outlinedSettingsGear.svg?react';

export function BasicExample() {
  return (
    <KNavItem
      label="Krones"
      icon={<OutlinedSettingsGear />}
      isHighlighted={false}
    />
  );
}
