import { KAvatar } from '@root/src/components/misc/kavatar';
import { KBadge } from '@root/src/components/misc/kbadge';

export function Example() {
  // priority: image > labels > icons
  // badge is optional
  return (
    <KAvatar
      size="normal"
      imageUrl="/user.png"
      label="XY"
      icon={<svg> ... </svg>}
    >
      <KBadge label="1" severity="danger" size="small" variant="filled" />
    </KAvatar>
  );
}
