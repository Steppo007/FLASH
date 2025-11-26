import { test } from '@playwright/test';
import { bothThemes, takeScreenshots } from '../../storybook-screenshotter';
import {
  ComponentInstanceValue,
  kInputTextSB,
} from '../../storybook-components';
import { expandObjectWithArrayValues } from '../../utils/jsobjects';
import { ComponentAction } from '../../componentActions';

test.describe('kinputtext', async () => {
  test('small and large sizes render correctly', async ({ browser }) => {
    const componentInstances = [{ size: 'small' }, { size: 'large' }];
    await takeScreenshots(browser, kInputTextSB, { componentInstances });
  });

  test('label, helper text, and tooltip render correctly in both themes', async ({
    browser,
  }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        label: ['Label'],
        helperText: ['Helper Text'],
        tooltipLabel: ['Tooltip'],
        invalid: [false, true],
      });
    const action: ComponentAction = async (
      capture,
      page,
      compLoc,
      frameLoc
    ) => {
      await frameLoc.locator('.kro-kinteractiveicon').hover();
      await capture('hover-tooltip');
    };
    await takeScreenshots(browser, kInputTextSB, {
      componentInstances,
      themes: bothThemes,
      action,
      captureWholePage: true,
    });
  });

  test('responds correctly to hover, click, and type', async ({ browser }) => {
    const action: ComponentAction = async (capture, page, compLoc) => {
      await compLoc.hover();
      await capture('hover');
      await compLoc.click();
      await capture('click');
      await page.keyboard.type('John Doe');
      await capture('type-john-doe');
    };
    await takeScreenshots(browser, kInputTextSB, {
      action,
      captureWholePage: true,
    });
  });

  test('does not respond to typing when disabled', async ({ browser }) => {
    const action: ComponentAction = async (capture, page, compLoc) => {
      await compLoc.click({ force: true });
      await page.keyboard.type('John Doe');
      await capture('disabled');
    };
    const componentInstances = [{ disabled: true }];
    await takeScreenshots(browser, kInputTextSB, {
      componentInstances,
      action,
    });
  });
});
