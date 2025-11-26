import { test } from '@playwright/test';
import { bothThemes, takeScreenshots } from '../../storybook-screenshotter';
import { ComponentInstanceValue, kButtonSB } from '../../storybook-components';
import { expandObjectWithArrayValues } from '../../utils/jsobjects';
import { ComponentAction, forceClickAction } from '../../componentActions';

test.describe('kbutton', async () => {
  test('button responds correctly to hover and click in different themes and variants', async ({
    browser,
  }) => {
    test.setTimeout(120_000); // this is testing a lot of permutations
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        variant: ['primary', 'outlined', 'ghost'],
        critical: [false, true],
        size: ['large'],
      });
    const action: ComponentAction = async (capture, page, compLoc) => {
      await capture('no-action');
      await compLoc.click();
      await capture('click');
    };
    await takeScreenshots(browser, kButtonSB, {
      componentInstances,
      themes: bothThemes,
      action,
    });
  });

  test('disabled button does not respond to clicking', async ({ browser }) => {
    const componentInstances = [{ disabled: true, size: 'small' }];
    await takeScreenshots(browser, kButtonSB, {
      componentInstances,
      action: forceClickAction,
    });
  });

  test('icon renders correctly', async ({ browser }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        icon: ['notificationBell', 'mailOutline'],
        iconPos: ['left', 'right'],
      });
    await takeScreenshots(browser, kButtonSB, { componentInstances });
  });
});
