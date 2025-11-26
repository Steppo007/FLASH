import { test } from '@playwright/test';
import { justDark, takeScreenshots } from '../../storybook-screenshotter';
import { ComponentInstanceValue, kTooltipSB } from '../../storybook-components';
import { expandObjectWithArrayValues } from '../../utils/jsobjects';
import { ComponentAction } from '../../componentActions';

const hoverAction: ComponentAction = async (
  capture,
  _page,
  compLoc,
  frameLoc
) => {
  await frameLoc.getByRole('button').hover();
  await capture('hover', frameLoc);
};

const focusAction: ComponentAction = async (
  capture,
  _page,
  compLoc,
  frameLoc
) => {
  await frameLoc.getByRole('button').focus();
  await capture('focus', frameLoc);
};

test.describe('ktooltip', async () => {
  test('renders correctly on each side', async ({ browser }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        position: ['bottom', 'top', 'left', 'right'],
      });
    await takeScreenshots(browser, kTooltipSB, {
      componentInstances,
      action: hoverAction,
    });
  });
  test('renders correctly in dark mode', async ({ browser }) => {
    await takeScreenshots(browser, kTooltipSB, {
      themes: justDark,
      action: hoverAction,
    });
  });
  test('works properly with focusing', async ({ browser }) => {
    const componentInstances = [{ event: 'focus' }];
    await takeScreenshots(browser, kTooltipSB, {
      componentInstances,
      action: focusAction,
    });
  });
});
