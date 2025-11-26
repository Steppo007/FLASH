import { test } from '@playwright/test';
import { kSelectButtonSB } from '../../storybook-components';
import { bothThemes, takeScreenshots } from '../../storybook-screenshotter';
import { ComponentAction } from '../../componentActions';

test.describe('kselectbutton', async () => {
  test('renders correctly in both themes', async ({ browser }) => {
    await takeScreenshots(browser, kSelectButtonSB, { themes: bothThemes });
  });
  test('responds correctly to clicking and hovering', async ({ browser }) => {
    const action: ComponentAction = async (capture, page, compLoc) => {
      await compLoc.getByRole('button').nth(0).hover();
      await capture(`hover-1st`);
      await compLoc.getByRole('button').nth(1).hover();
      await capture(`hover-2nd`);
      await compLoc.getByRole('button').nth(1).click();
      await capture(`click-2nd`);
    };
    await takeScreenshots(browser, kSelectButtonSB, { action });
  });
});
