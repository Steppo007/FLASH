import { test } from '@playwright/test';
import { kTabMenuSB } from '../../storybook-components';
import { justDark, takeScreenshots } from '../../storybook-screenshotter';
import { ComponentAction } from '../../componentActions';

test.describe('ktabmenu', async () => {
  test('different sizes render correctly', async ({ browser }) => {
    const componentInstances = [{ size: 'small' }, { size: 'default' }];
    await takeScreenshots(browser, kTabMenuSB, { componentInstances });
  });
  test('dark mode renders correctly', async ({ browser }) => {
    await takeScreenshots(browser, kTabMenuSB, { themes: justDark });
  });
  test('responds correctly to clicking and hovering', async ({ browser }) => {
    const action: ComponentAction = async (capture, page, compLoc) => {
      await compLoc.getByRole('presentation').nth(1).hover();
      await capture('hover-2nd');
      await compLoc.getByRole('presentation').nth(1).click();
      await capture('click-2nd');
      await compLoc.getByRole('presentation').nth(2).click();
      await capture('click-disabled');
    };
    await takeScreenshots(browser, kTabMenuSB, { action });
  });
});
