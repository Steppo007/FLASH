import { test } from '@playwright/test';
import { justDark, takeScreenshots } from '../../storybook-screenshotter';
import { ComponentInstanceValue, kAvatarSB } from '../../storybook-components';
import { expandObjectWithArrayValues } from '../../utils/jsobjects';

test.fixme(
  ({ browserName }) => browserName === 'webkit',
  'Safari snapshots are unstable, to be fixed'
);

test.describe('kavatar', async () => {
  test('badge renders correctly in different sizes', async ({ browser }) => {
    const componentInstances = [
      {
        size: 'small',
        children: 'small badge',
      },
      {
        size: 'normal',
        children: 'small badge',
      },
      {
        size: 'large',
        children: 'large badge',
      },
      {
        size: 'xlarge',
        children: 'large badge',
      },
    ];
    await takeScreenshots(browser, kAvatarSB, { componentInstances });
  });
  test('icon renders correctly in different sizes', async ({ browser }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        size: ['small', 'normal', 'large', 'xlarge'],
        icon: ['notificationBell'],
      });
    await takeScreenshots(browser, kAvatarSB, { componentInstances });
  });
  test('image renders correctly in different sizes', async ({ browser }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        size: ['small', 'normal', 'large', 'xlarge'],
        imageUrl: ['user'],
      });
    await takeScreenshots(browser, kAvatarSB, { componentInstances });
  });
  test('label renders correctly in different sizes', async ({ browser }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        size: ['small', 'normal', 'large', 'xlarge'],
        label: ['XY'],
      });
    await takeScreenshots(browser, kAvatarSB, { componentInstances });
  });
  test('dark mode renders correctly', async ({ browser }) => {
    await takeScreenshots(browser, kAvatarSB, { themes: justDark });
  });
});
