import { test } from '@playwright/test';
import { bothThemes, takeScreenshots } from '../../storybook-screenshotter';
import {
  ComponentInstance,
  ComponentInstanceValue,
  kInputDropdownSB,
} from '../../storybook-components';
import { expandObjectWithArrayValues } from '../../utils/jsobjects';
import { ComponentAction, forceClickAction } from '../../componentActions';

test.describe('kinputdropdown', async () => {
  test('different sizes render correctly', async ({ browser }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        size: ['small', 'large'],
      });
    await takeScreenshots(browser, kInputDropdownSB, { componentInstances });
  });

  test('renders correctly in both themes and variants', async ({ browser }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        invalid: [false, true],
        size: ['default'],
        helperText: ['Helper Text'],
      });
    await takeScreenshots(browser, kInputDropdownSB, {
      componentInstances,
      captureWholePage: true,
      themes: bothThemes,
    });
  });

  test('dropdown responds correctly to interaction', async ({ browser }) => {
    const action: ComponentAction = async (
      capture,
      page,
      compLoc,
      frameLoc
    ) => {
      await compLoc.hover();
      await capture('hover');
      await compLoc.click();
      await capture('click');
      await frameLoc.getByRole('option').getByText('London').hover();
      await capture('hover-london');
      await frameLoc.getByRole('option').getByText('London').click();
      await capture('select-london');
      await compLoc.click();
      await capture('london-selected');
      await frameLoc.getByRole('option').nth(1).click();
      await frameLoc.locator('[data-pc-section=clearicon]').click();
      await capture('cleared');
    };
    const componentInstances = [{ showClear: true }];
    await takeScreenshots(browser, kInputDropdownSB, {
      captureWholePage: true,
      fullScreen: true,
      action,
      componentInstances,
    });
  });

  test('filterable dropdown responds correctly to interaction', async ({
    browser,
  }) => {
    const componentInstances = [{ filter: true }];
    const action: ComponentAction = async (
      capture,
      page,
      compLoc,
      frameLoc
    ) => {
      await compLoc.click();
      await frameLoc.locator('[data-pc-section="filterinput"]').click();
      await page.keyboard.type('par');
      await page.waitForTimeout(1000);
      await capture('type-par');
      await page.keyboard.type('xy');
      await page.waitForTimeout(1000);
      await capture('type-parxy');
    };
    await takeScreenshots(browser, kInputDropdownSB, {
      captureWholePage: true,
      fullScreen: true,
      componentInstances,
      action,
    });
  });

  test('editable dropdown responds correctly to interaction', async ({
    browser,
  }) => {
    const componentInstances = [{ editable: true }];
    const action: ComponentAction = async (capture, page, compLoc) => {
      await compLoc.click();
      // On firefox, somehow we have to try opening the editable inputdropdown twice in the tests
      // TODO: figure out the actual issue
      const isDropdownVisible = await compLoc
        .locator('.kro-kinputdropdown-panel')
        .isVisible();
      if (browser.browserType().name() === 'firefox' && !isDropdownVisible)
        await compLoc.click();
      await page.keyboard.type('par');
      await page.waitForTimeout(1000);
      await capture('type-par');
      await page.keyboard.type('xy');
      await page.waitForTimeout(1000);
      await capture('type-parxy');
    };
    await takeScreenshots(browser, kInputDropdownSB, {
      captureWholePage: true,
      fullScreen: true,
      componentInstances,
      action,
    });
  });

  test('dropdown does not respond when disabled', async ({ browser }) => {
    const componentInstances: ComponentInstance[] = [{ disabled: true }];
    await takeScreenshots(browser, kInputDropdownSB, {
      action: forceClickAction,
      componentInstances,
      captureWholePage: true,
    });
  });
});
