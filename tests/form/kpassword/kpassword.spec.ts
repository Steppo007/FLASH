import { test } from '@playwright/test';
import { bothThemes, takeScreenshots } from '../../storybook-screenshotter';
import {
  ComponentInstanceValue,
  kPasswordSB,
} from '../../storybook-components';
import { expandObjectWithArrayValues } from '../../utils/jsobjects';
import { ComponentAction } from '../../componentActions';

test.describe('kpassword', () => {
  test('renders correctly with combinations of size, invalid, and helper text', async ({
    browser,
  }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        size: ['default'],
        invalid: [true, false],
        helperText: ['Helper text'],
      });

    await takeScreenshots(browser, kPasswordSB, {
      componentInstances,
      themes: bothThemes,
    });
  });

  test('toggles password visibility with toggleMask', async ({ browser }) => {
    const componentInstances = [{ toggleMask: true }];

    const action: ComponentAction = async (
      capture,
      page,
      compLoc,
      frameLoc
    ) => {
      await capture('initial');
      const toggleBtn = frameLoc.locator('.p-password-show-icon');
      await toggleBtn.click();
      await capture('after-toggle');
    };

    await takeScreenshots(browser, kPasswordSB, {
      componentInstances,
      action,
    });
  });

  test('does not accept input when disabled', async ({ browser }) => {
    const componentInstances = [{ disabled: true }];

    const action: ComponentAction = async (capture, page, compLoc) => {
      const input = compLoc.locator('input');
      await input.fill('Should not appear', { force: true });
      await capture('disabled');
    };

    await takeScreenshots(browser, kPasswordSB, {
      componentInstances,
      action,
    });
  });

  test('shows helper text correctly', async ({ browser }) => {
    const componentInstances = [{ helperText: 'Enter your password' }];

    const action: ComponentAction = async (capture) => {
      await capture('with-helper-text');
    };

    await takeScreenshots(browser, kPasswordSB, {
      componentInstances,
      action,
      captureWholePage: true,
    });
  });

  test('renders float label correctly', async ({ browser }) => {
    const componentInstances = [{ floatLabel: 'Password' }];

    const action: ComponentAction = async (capture) => {
      await capture('with-float-label');
    };

    await takeScreenshots(browser, kPasswordSB, {
      componentInstances,
      action,
      captureWholePage: true,
    });
  });
});
