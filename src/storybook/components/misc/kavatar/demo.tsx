import { AvatarSize, KAvatar } from '@complib/misc/kavatar';
import {
  KBadge,
  KBadgeSeverity,
  KBadgeSize,
} from '@root/src/components/misc/kbadge';
import OutlinedSettingsGear from '@root/assets/svgs/icons/outlinedSettingsGear.svg?react';
import { ExampleWrapper } from '@sbook/utils';

export default function AvatarExamples() {
  const sizes: { avatarSize: AvatarSize; badgeSize: KBadgeSize }[] = [
    {
      avatarSize: 'small',
      badgeSize: 'small',
    },
    {
      avatarSize: 'normal',
      badgeSize: 'small',
    },
    {
      avatarSize: 'large',
      badgeSize: 'large',
    },
    {
      avatarSize: 'xlarge',
      badgeSize: 'large',
    },
  ];
  const badgeValues = ['1', '12', '123'];
  const badgeSeverities: KBadgeSeverity[] = ['danger', 'subdued', 'warning'];

  const avatars: React.ReactNode[] = [];

  badgeSeverities.forEach((severity) => {
    badgeValues.forEach((value) => {
      sizes.forEach((size) => {
        avatars.push(
          <KAvatar
            key={'label' + severity + value + size.avatarSize + size.badgeSize}
            size={size.avatarSize}
            label={'XY'}
          >
            <KBadge label={value} severity={severity} size={size.badgeSize} />
          </KAvatar>
        );
      });
    });
  });

  badgeSeverities.forEach((severity) => {
    badgeValues.forEach((value) => {
      sizes.forEach((size) => {
        avatars.push(
          <KAvatar
            key={'img' + severity + value + size.avatarSize + size.badgeSize}
            size={size.avatarSize}
            imageUrl={'/dummyUser.png'}
          >
            <KBadge label={value} severity={severity} size={size.badgeSize} />
          </KAvatar>
        );
      });
    });
  });

  badgeSeverities.forEach((severity) => {
    badgeValues.forEach((value) => {
      sizes.forEach((size) => {
        avatars.push(
          <KAvatar
            key={'svg' + severity + value + size.avatarSize + size.badgeSize}
            size={size.avatarSize}
            icon={<OutlinedSettingsGear />}
          >
            <KBadge label={value} severity={severity} size={size.badgeSize} />
          </KAvatar>
        );
      });
    });
  });

  return (
    <ExampleWrapper className="flex flex-wrap items-center gap-4">
      {avatars}
    </ExampleWrapper>
  );
}
