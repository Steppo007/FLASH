import { test } from '@playwright/test';
import { bothThemes, takeScreenshots } from '../../storybook-screenshotter';
import {
  ComponentInstanceValue,
  kProgressSpinnerSB,
} from '../../storybook-components';
import { expandObjectWithArrayValues } from '../../utils/jsobjects';

test.describe('kprogressspinner', async () => {
  test('different sizes render correctly in different themes', async ({
    browser,
  }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        size: ['small', 'default', 'xlarge'],
      });

    await takeScreenshots(browser, kProgressSpinnerSB, {
      componentInstances,
      themes: bothThemes,
    });
  });
});
