import { test } from '@playwright/test';
import { bothThemes, takeScreenshots } from '../../storybook-screenshotter';
import {
  ComponentInstanceValue,
  kInputTextareaSB,
} from '../../storybook-components';
import { expandObjectWithArrayValues } from '../../utils/jsobjects';
import { ComponentAction } from '../../componentActions';

test.describe('kinputtextarea', async () => {
  test('label and helper text render correctly in both themes', async ({
    browser,
  }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        label: ['Label'],
        helperText: ['Helper Text'],
        invalid: [false, true],
        disabled: [false, true],
      });
    await takeScreenshots(browser, kInputTextareaSB, {
      componentInstances,
      themes: bothThemes,
      captureWholePage: true,
    });
  });

  test('responds correctly to hover, click, and type', async ({ browser }) => {
    const action: ComponentAction = async (capture, page, compLoc) => {
      await compLoc.hover();
      await capture('hover');
      await compLoc.click();
      await capture('click');
      await page.keyboard.type('First row');
      await page.keyboard.down('Enter');
      await page.keyboard.type('Second row');
      await capture('type-two-lines');
    };
    await takeScreenshots(browser, kInputTextareaSB, {
      action,
      captureWholePage: true,
    });
  });
});
