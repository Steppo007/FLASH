import { test } from '@playwright/test';
import { justDark, takeScreenshots } from '../../storybook-screenshotter';
import { ComponentInstanceValue, kTagSB } from '../../storybook-components';
import { expandObjectWithArrayValues } from '../../utils/jsobjects';

const severities = ['success', 'warning', 'danger', 'neutral', 'info'] as const;

test.describe('ktag', async () => {
  test('different severity types and rounded states render correctly', async ({
    browser,
  }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        severity: [...severities],
        rounded: [true],
      });
    await takeScreenshots(browser, kTagSB, { componentInstances });
  });

  test('dark mode renders correctly', async ({ browser }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        severity: [...severities],
        rounded: [true],
      });
    await takeScreenshots(browser, kTagSB, {
      componentInstances,
      themes: justDark,
    });
  });
});
