import { test } from '@playwright/test';
import { bothThemes, takeScreenshots } from '../../storybook-screenshotter';
import { ComponentInstanceValue, kNavItemSB } from '../../storybook-components';
import { expandObjectWithArrayValues } from '../../utils/jsobjects';
import { hoverAction } from '../../componentActions';

test.describe('knavitem', async () => {
  test('badges render correctly', async ({ browser }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        children: ['small badge', 'large badge'],
      });
    await takeScreenshots(browser, kNavItemSB, { componentInstances });
  });
  test('icon alone renders correctly', async ({ browser }) => {
    const componentInstances = [{ icon: 'languageGlobe' }];
    await takeScreenshots(browser, kNavItemSB, { componentInstances });
  });
  test('icon and label render correctly', async ({ browser }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        icon: ['languageGlobe'],
        label: ['Krones'],
        iconPos: ['left', 'right'],
      });
    await takeScreenshots(browser, kNavItemSB, { componentInstances });
  });
  test('highlighted state renders correctly in both themes', async ({
    browser,
  }) => {
    const componentInstances = [
      { icon: 'languageGlobe', label: 'Krones', isHighlighted: true },
    ];
    await takeScreenshots(browser, kNavItemSB, {
      componentInstances,
      themes: bothThemes,
    });
  });
  test('hovering state renders correctly in both themes', async ({
    browser,
  }) => {
    const componentInstances = [{ icon: 'languageGlobe', label: 'Krones' }];
    await takeScreenshots(browser, kNavItemSB, {
      componentInstances,
      action: hoverAction,
      themes: bothThemes,
    });
  });
});
