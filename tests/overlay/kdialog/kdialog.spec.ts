import { test } from '@playwright/test';
import { bothThemes, takeScreenshots } from '../../storybook-screenshotter';
import { kDialogSB } from '../../storybook-components';
import { ComponentAction } from '../../componentActions';

test.describe('kdialog', async () => {
  test('can open and close dialog', async ({ browser }) => {
    const action: ComponentAction = async (
      capture,
      page,
      compLoc,
      frameLoc
    ) => {
      await frameLoc.locator('.kro-kbutton').click();
      await capture('open-dialog');
      await page.keyboard.press('Enter');
      await capture('close-dialog');
    };
    await takeScreenshots(browser, kDialogSB, {
      action,
      themes: bothThemes,
      captureWholePage: true,
      fullScreen: true,
    });
  });
});
