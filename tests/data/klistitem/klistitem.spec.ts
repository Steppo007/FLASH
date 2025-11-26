import { test } from '@playwright/test';
import {
  bothThemes,
  justLight,
  takeScreenshots,
} from '../../storybook-screenshotter';
import {
  ComponentInstanceValue,
  kListItemSB,
} from '../../storybook-components';
import { forceClickAction } from '../../componentActions';
import { expandObjectWithArrayValues } from '../../utils/jsobjects';

test.describe('klistitem', async () => {
  test('button list item responds correctly to hover and click in different themes', async ({
    browser,
  }) => {
    const componentInstances = [{ component: 'button' }];

    await takeScreenshots(browser, kListItemSB, {
      componentInstances,
      themes: bothThemes,
      action: async (capture, page, compLoc) => {
        await capture('no-action');
        await compLoc.hover();
        await capture('hover');
        await compLoc.click();
        await capture('click');
      },
    });
  });

  test('disabled list item does not respond to clicking in both themes', async ({
    browser,
  }) => {
    const componentInstances = [{ disabled: true }];

    await takeScreenshots(browser, kListItemSB, {
      componentInstances,
      themes: bothThemes,
      action: forceClickAction,
    });
  });

  test('non-button list item does not respond to clicking', async ({
    browser,
  }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        component: ['div', 'li', 'span'],
      });

    await takeScreenshots(browser, kListItemSB, {
      componentInstances,
      themes: justLight,
      action: forceClickAction,
    });
  });
});
