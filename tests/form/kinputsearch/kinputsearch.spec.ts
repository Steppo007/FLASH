import { test } from '@playwright/test';
import { bothThemes, takeScreenshots } from '../../storybook-screenshotter';
import {
  ComponentInstance,
  ComponentInstanceValue,
  kInputSearchSB,
} from '../../storybook-components';
import { expandObjectWithArrayValues } from '../../utils/jsobjects';
import { ComponentAction, forceClickAction } from '../../componentActions';

test.describe('kinputsearch', async () => {
  test('different sizes render correctly', async ({ browser }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        size: ['small', 'large'],
      });
    await takeScreenshots(browser, kInputSearchSB, { componentInstances });
  });

  test('renders correctly in both themes and variants', async ({ browser }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        invalid: [false, true],
        size: ['default'],
        helperText: ['Helper Text'],
      });
    await takeScreenshots(browser, kInputSearchSB, {
      componentInstances,
      captureWholePage: true,
      themes: bothThemes,
    });
  });

  test('input search responds correctly to interaction', async ({
    browser,
  }) => {
    const componentInstances = [{ editable: true }];
    const action: ComponentAction = async (capture, page, compLoc) => {
      await compLoc.click();
      await page.keyboard.type('x');
      await page.waitForTimeout(1000);
      await capture('type-x');
      await page.keyboard.type('xy');
      await page.waitForTimeout(1000);
      await capture('type-xy');
    };
    await takeScreenshots(browser, kInputSearchSB, {
      captureWholePage: true,
      fullScreen: true,
      componentInstances,
      action,
    });
  });

  test('dropdown does not respond when disabled', async ({ browser }) => {
    const componentInstances: ComponentInstance[] = [{ disabled: true }];
    await takeScreenshots(browser, kInputSearchSB, {
      action: forceClickAction,
      componentInstances,
      captureWholePage: true,
    });
  });
});
