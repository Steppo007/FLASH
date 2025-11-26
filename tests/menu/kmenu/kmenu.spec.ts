import { test } from '@playwright/test';
import { bothThemes, takeScreenshots } from '../../storybook-screenshotter';
import { kMenuSB } from '../../storybook-components';
import { ComponentAction } from '../../componentActions';

test.describe('kmenu', async () => {
  test('basic menu renders correctly', async ({ browser }) => {
    const componentInstances = [{ model: 'basic' }];
    const action: ComponentAction = async (capture, page, compLoc) => {
      await compLoc.getByRole('menuitem').nth(0).hover();
      await capture('basic-hover-1st');
      await compLoc.getByRole('menuitem').nth(0).click();
      await capture('basic-click-1st');
      await page.keyboard.press('ArrowDown');
      await capture('basic-click-1st-then-arrow-down');
    };
    await takeScreenshots(browser, kMenuSB, { componentInstances, action });
  });

  test('highlighted menu renders correctly', async ({ browser }) => {
    const componentInstances = [{ model: 'highlighted' }];
    const action: ComponentAction = async (capture, page, compLoc) => {
      await capture('highlighted-no-action');
      await compLoc.getByRole('menuitem').nth(1).click();
      await capture('highlighted-click-2nd');
    };
    await takeScreenshots(browser, kMenuSB, {
      componentInstances,
      action,
      themes: bothThemes,
    });
  });

  test('popup menu renders correctly', async ({ browser }) => {
    const componentInstances = [{ model: 'popup' }];
    const action: ComponentAction = async (
      capture,
      page,
      compLoc,
      frameLoc
    ) => {
      await frameLoc.locator('.kro-kinteractiveicon').click();
      await capture('popup-open');
      await compLoc.getByRole('menuitem').nth(1).hover();
      await capture('popup-hover-2nd');
    };
    await takeScreenshots(browser, kMenuSB, {
      componentInstances,
      action,
      captureWholePage: true,
    });
  });

  test('custom menu renders correctly', async ({ browser }) => {
    const componentInstances = [{ model: 'custom' }];
    await takeScreenshots(browser, kMenuSB, { componentInstances });
  });
});
