import { test } from '@playwright/test';
import { justDark, takeScreenshots } from '../../storybook-screenshotter';
import { kMultiPageDialogSB } from '../../storybook-components';
import { ComponentAction } from '../../componentActions';

test.describe('kmultipagedialog', async () => {
  test('responds correctly to clicking on tabs', async ({ browser }) => {
    const action: ComponentAction = async (capture, page, compLoc) => {
      await compLoc.getByRole('presentation').nth(0).click();
      await capture('click-1st');
      await compLoc.getByRole('presentation').nth(1).click();
      await capture('click-2nd');
      await compLoc.getByRole('presentation').nth(2).click();
      await capture('click-3rd');
    };
    await takeScreenshots(browser, kMultiPageDialogSB, {
      action,
      fullScreen: true,
    });
  });

  test('renders correctly in dark mode', async ({ browser }) => {
    await takeScreenshots(browser, kMultiPageDialogSB, {
      themes: justDark,
      fullScreen: true,
    });
  });
});
