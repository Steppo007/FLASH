import { test } from '@playwright/test';
import { bothThemes, takeScreenshots } from '../../storybook-screenshotter';
import {
  ComponentInstance,
  ComponentInstanceValue,
  kTreeSelectSB,
} from '../../storybook-components';
import { expandObjectWithArrayValues } from '../../utils/jsobjects';
import { ComponentAction, forceClickAction } from '../../componentActions';

test.describe('ktreeselect', async () => {
  test('components renders correctly in both themes and variants', async ({
    browser,
  }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        invalid: [false, true],
        size: ['default'],
      });
    await takeScreenshots(browser, kTreeSelectSB, {
      componentInstances,
      captureWholePage: true,
      themes: bothThemes,
    });
  });

  test('ktreeselect responds correctly to interaction', async ({ browser }) => {
    const action: ComponentAction = async (
      capture,
      page,
      compLoc,
      frameLoc
    ) => {
      await compLoc.hover();
      await capture('hover');
      await compLoc.click();
      await frameLoc.locator('[data-pc-section=content]').nth(1).hover();
      await capture('hover-1st');
      await frameLoc.locator('[data-pc-section=toggler]').nth(1).click();
      await capture('opened-tree');
      await frameLoc.locator('li.p-treenode.p-treenode-leaf').first().click();
      await compLoc.click();
      await capture('item-selected');
    };
    const componentInstances = [{ showClear: true }];
    await takeScreenshots(browser, kTreeSelectSB, {
      captureWholePage: true,
      fullScreen: true,
      action,
      componentInstances,
    });
  });

  test('ktreeselect responds correctly to filters', async ({ browser }) => {
    const action: ComponentAction = async (
      capture,
      page,
      compLoc,
      frameLoc
    ) => {
      await compLoc.click();
      await capture('filter-empty');
      await frameLoc
        .locator('input[data-pc-section=filter]')
        .first()
        .fill('txt');
      await page.waitForTimeout(1000);
      await capture('filter-txt');
      await frameLoc
        .locator('input[data-pc-section=filter]')
        .first()
        .fill('abcdef');
      await page.waitForTimeout(1000);
      await capture('filter-no-result');
    };
    const componentInstances = [{ filter: true }];
    await takeScreenshots(browser, kTreeSelectSB, {
      captureWholePage: true,
      fullScreen: true,
      action,
      componentInstances,
    });
  });

  test('ktreeselect does not respond when disabled', async ({ browser }) => {
    const componentInstances: ComponentInstance[] = [{ disabled: true }];
    await takeScreenshots(browser, kTreeSelectSB, {
      action: forceClickAction,
      componentInstances,
      captureWholePage: true,
      themes: bothThemes,
    });
  });
});
