import { test } from '@playwright/test';
import { bothThemes, takeScreenshots } from '../../storybook-screenshotter';
import { ComponentInstanceValue, kBadgeSB } from '../../storybook-components';
import { expandObjectWithArrayValues } from '../../utils/jsobjects';

test.describe('kbadge', async () => {
  test('different sizes render correctly', async ({ browser }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        size: ['xsmall', 'small', 'large'],
      });
    await takeScreenshots(browser, kBadgeSB, { componentInstances });
  });
  test('different severities render correctly', async ({ browser }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        severity: ['danger', 'warning', 'subdued'],
        label: ['1'],
        size: ['large'],
      });
    await takeScreenshots(browser, kBadgeSB, {
      componentInstances,
      themes: bothThemes,
    });
  });
  test('different length labels render correctly', async ({ browser }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        label: ['1', '123', '12345'],
        size: ['small', 'large'],
      });
    await takeScreenshots(browser, kBadgeSB, { componentInstances });
  });
});
