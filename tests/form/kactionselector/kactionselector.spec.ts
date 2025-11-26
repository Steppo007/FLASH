import test from '@playwright/test';
import { bothThemes, takeScreenshots } from '../../storybook-screenshotter';
import { KActionSelectorSB } from '../../storybook-components';
import { ComponentAction } from '../../componentActions';

test.describe('kactionselector', async () => {
  test('renders correctly in both themes', async ({ browser }) => {
    await takeScreenshots(browser, KActionSelectorSB, { themes: bothThemes });
  });

  test('renders correctly with a single item array', async ({
    browser,
  }, testInfo) => {
    // Skip test if not running in Chromium
    if (!testInfo.project.name.includes('chromium')) {
      test.skip();
      return;
    }

    const componentInstances = [
      {
        singleItemArray: true,
      },
    ];
    await takeScreenshots(browser, KActionSelectorSB, { componentInstances });
  });

  test('responds correctly to clicking and hovering', async ({ browser }) => {
    const action: ComponentAction = async (
      capture,
      page,
      compLoc,
      frameLoc
    ) => {
      await compLoc.locator('.kro-kactionselector-button').first().hover();
      await capture('button-changes-on-hover');
      await compLoc.locator('.kro-kactionselector-header button').click();
      await capture('overlay-appears');
      await frameLoc.getByText('Paris').click();
      await frameLoc
        .locator('.kro-kactionselector-mask')
        .waitFor({ state: 'hidden' });
      await capture('choice-is-changes');
    };

    await takeScreenshots(browser, KActionSelectorSB, {
      action,
      captureWholePage: true,
    });
  });
});
