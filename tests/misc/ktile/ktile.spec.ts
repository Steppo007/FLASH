import { test } from '@playwright/test';
import { bothThemes, takeScreenshots } from '../../storybook-screenshotter';
import { kTileSB } from '../../storybook-components';
import { hoverAction } from '../../componentActions';

const componentInstances = [{ view: 'tile' }, { view: 'list' }];

test.describe('ktile', async () => {
  test('tile and list views render correctly', async ({ browser }) => {
    await takeScreenshots(browser, kTileSB, {
      componentInstances,
      themes: bothThemes,
    });
  });

  test('hover states render correctly', async ({ browser }) => {
    await takeScreenshots(browser, kTileSB, {
      componentInstances,
      action: hoverAction,
      themes: bothThemes,
    });
  });
});
