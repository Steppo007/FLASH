import { test } from '@playwright/test';
import { bothThemes, takeScreenshots } from '../../storybook-screenshotter';
import {
  ComponentInstanceValue,
  kIconButtonSB,
} from '../../storybook-components';
import { expandObjectWithArrayValues } from '../../utils/jsobjects';

test.describe('kiconbutton', async () => {
  test('button renders correctly in different themes and variants', async ({
    browser,
  }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        variant: ['primary', 'outlined', 'ghost'],
        critical: [false, true],
        size: ['large'],
        icon: ['languageGlobe'],
      });

    await takeScreenshots(browser, kIconButtonSB, {
      componentInstances,
      themes: bothThemes,
    });
  });
});
