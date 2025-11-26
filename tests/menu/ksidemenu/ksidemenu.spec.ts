import { test } from '@playwright/test';
import { kSideMenuSb } from '../../storybook-components';
import { bothThemes, takeScreenshots } from '../../storybook-screenshotter';
import { ComponentAction } from '../../componentActions';

test.describe('ksidemenu', async () => {
  test('renders correctly in both themes', async ({ browser }) => {
    await takeScreenshots(browser, kSideMenuSb, {
      themes: bothThemes,
      fullScreen: true,
    });
  });
  test('responds correctly to clicking and hovering', async ({ browser }) => {
    const action: ComponentAction = async (capture, page, compLoc) => {
      await compLoc.getByRole('presentation').nth(1).hover();
      await capture(`hover-2nd`);
      await compLoc.getByRole('presentation').nth(1).click();
      await capture(`click-2nd`);
      await compLoc.getByRole('presentation').nth(2).click();
      await capture(`click-3rd`);
    };
    await takeScreenshots(browser, kSideMenuSb, { action, fullScreen: true });
  });
});
