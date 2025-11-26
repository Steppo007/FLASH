import { test } from '@playwright/test';
import { takeScreenshots } from '../../storybook-screenshotter';
import { kLinkButtonSB } from '../../storybook-components';
import { ComponentAction, forceClickAction } from '../../componentActions';

test.describe('klinkbutton', async () => {
  test('responds correctly to clicking and hovering in both themes', async ({
    browser,
  }) => {
    const action: ComponentAction = async (capture, page, compLoc) => {
      await capture('no-action');
      await compLoc.hover();
      await capture('hover');
      await compLoc.click();
      await capture('click');
    };
    const componentInstances = [
      { size: 'small', showArrow: false, diabled: false },
    ];
    await takeScreenshots(browser, kLinkButtonSB, {
      componentInstances,
      action,
    });
  });

  test('arrow renders correctly', async ({ browser }) => {
    const componentInstances = [{ showArrow: true }];
    await takeScreenshots(browser, kLinkButtonSB, { componentInstances });
  });

  test('large size renders correctly', async ({ browser }) => {
    const componentInstances = [{ size: 'large' }];
    await takeScreenshots(browser, kLinkButtonSB, { componentInstances });
  });

  test('does not respond to clicking when disabled', async ({ browser }) => {
    const componentInstances = [{ disabled: 'true' }];
    await takeScreenshots(browser, kLinkButtonSB, {
      action: forceClickAction,
      componentInstances,
    });
  });
});
