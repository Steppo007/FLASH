import { test } from '@playwright/test';
import { bothThemes, takeScreenshots } from '../../storybook-screenshotter';
import { kConfirmDialogSB } from '../../storybook-components';

test.describe('kconfirmdialog', async () => {
  test('renders correctly in both themes', async ({ browser }) => {
    const componentInstances = [{ icon: 'warning' }];
    await takeScreenshots(browser, kConfirmDialogSB, {
      componentInstances,
      themes: bothThemes,
      fullScreen: true,
    });
  });
});
