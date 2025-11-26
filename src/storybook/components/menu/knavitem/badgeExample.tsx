import { KNavItem } from '@root/src/components/menu/knavitem';
import { KBadge } from '@root/src/components/misc/kbadge';

// the following import works with vite-plugin-svgr
import OutlinedSettingsGear from '@flash/ui-components/assets/icons/svgs/outlinedSettingsGear.svg?react';

export function BadgeExample() {
  return (
    <KNavItem
      label="Krones"
      icon={<OutlinedSettingsGear />}
      isHighlighted={false}
      positionBadge={true}
    >
      <KBadge label="1" severity="danger" size="small" />
    </KNavItem>
  );
}
