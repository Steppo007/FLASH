import { expect, test } from '@playwright/test';
import { justDark, takeScreenshots } from '../../storybook-screenshotter';
import {
  ComponentInstanceValue,
  kInteractiveIconSB,
} from '../../storybook-components';
import { expandObjectWithArrayValues } from '../../utils/jsobjects';
import { ComponentAction, hoverAction } from '../../componentActions';

test.describe('kinteractiveicon', async () => {
  test('small and large sizes render correctly', async ({ browser }) => {
    const componentInstances = [{ size: 'small' }, { size: 'large' }];
    await takeScreenshots(browser, kInteractiveIconSB, { componentInstances });
  });

  test('renders correctly in dark mode', async ({ browser }) => {
    await takeScreenshots(browser, kInteractiveIconSB, { themes: justDark });
  });

  test('tooltip appears correctly on each side', async ({ browser }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        tooltipPosition: ['bottom', 'top', 'left', 'right'],
      });
    await takeScreenshots(browser, kInteractiveIconSB, {
      componentInstances,
      action: hoverAction,
      captureWholePage: true,
    });
  });

  test('does not respond to clicking or hovering when disabled', async ({
    browser,
  }) => {
    const action: ComponentAction = async (capture, page, compLoc) => {
      await compLoc.hover();
      await capture('hover-disabled');
      await expect(compLoc.click({ timeout: 500 })).rejects.toThrow();
    };
    const componentInstances = [{ disabled: true }];
    await takeScreenshots(browser, kInteractiveIconSB, {
      componentInstances,
      action,
    });
  });
});
