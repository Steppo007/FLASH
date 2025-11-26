import test from '@playwright/test';
import { bothThemes, takeScreenshots } from '../../storybook-screenshotter';
import { kSelectListSB } from '../../storybook-components';
import { ComponentAction } from '../../componentActions';

test.describe('kselectlist', async () => {
  test('renders correctly in both themes', async ({ browser }) => {
    await takeScreenshots(browser, kSelectListSB, { themes: bothThemes });
  });

  test('responds correctly to clicking and hovering (single)', async ({
    browser,
  }) => {
    const action: ComponentAction = async (capture, page, compLoc) => {
      const choiceButtonLoc = '.kro-select-list-items button';
      await compLoc.locator(choiceButtonLoc).nth(0).hover();
      await capture(`hover-1st`);
      await compLoc.locator(choiceButtonLoc).nth(1).hover();
      await capture(`hover-2nd`);
      await compLoc.locator(choiceButtonLoc).nth(1).click();
      await capture(`click-2nd`);
    };

    await takeScreenshots(browser, kSelectListSB, { action });
  });

  test('responds correctly to clicking and hovering (multiple)', async ({
    browser,
  }) => {
    const componentInstances = [
      {
        header: 'Language',
        selectionMode: 'multiple',
        options: [
          { label: 'English (UK)', value: 'en-GB' },
          { label: 'Deutsch', value: 'de-DE' },
        ],
        value: 'en-GB',
      },
    ];
    const action: ComponentAction = async (capture, page, compLoc) => {
      const choiceButtonLoc = '.kro-select-list-items button';
      await compLoc.locator(choiceButtonLoc).nth(0).hover();
      await capture(`multiple-hover-1st`);
      await compLoc.locator(choiceButtonLoc).nth(0).click();
      await capture(`multiple-unselect-1st`);
      await compLoc.locator('.kro-select-list-header').nth(0).click();
      await capture(`multiple-all-selected`);
    };

    await takeScreenshots(browser, kSelectListSB, {
      action,
      componentInstances,
    });
  });
});
