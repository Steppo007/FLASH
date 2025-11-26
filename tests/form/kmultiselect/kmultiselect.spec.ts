import { test } from '@playwright/test';
import { bothThemes, takeScreenshots } from '../../storybook-screenshotter';
import {
  ComponentInstance,
  ComponentInstanceValue,
  kMultiSelectSB,
} from '../../storybook-components';
import { expandObjectWithArrayValues } from '../../utils/jsobjects';
import { ComponentAction, forceClickAction } from '../../componentActions';

test.describe('kmultiselect', async () => {
  test('different sizes render correctly', async ({ browser }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        size: ['small', 'large'],
      });
    await takeScreenshots(browser, kMultiSelectSB, {
      componentInstances,
      captureWholePage: true,
    });
  });

  test('renders correctly in both themes and variants', async ({ browser }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        invalid: [false, true],
        size: ['default'],
      });
    await takeScreenshots(browser, kMultiSelectSB, {
      componentInstances,
      captureWholePage: true,
      themes: bothThemes,
    });
  });

  test('multiselect responds correctly to interaction', async ({ browser }) => {
    const action: ComponentAction = async (
      capture,
      page,
      compLoc,
      frameLoc
    ) => {
      await compLoc.hover();
      await capture('hover');
      await compLoc.click();
      await frameLoc.getByRole('option').nth(2).hover();
      await capture('hover-3rd');
      await frameLoc.getByRole('option').nth(2).click();
      await capture('select-3rd');
      await compLoc.click();
      await capture('item-selected');
    };
    const componentInstances = [{ showClear: true }];
    await takeScreenshots(browser, kMultiSelectSB, {
      captureWholePage: true,
      fullScreen: true,
      action,
      componentInstances,
    });
  });

  test('multiselect does not respond when disabled', async ({ browser }) => {
    const componentInstances: ComponentInstance[] = [{ disabled: true }];
    await takeScreenshots(browser, kMultiSelectSB, {
      action: forceClickAction,
      componentInstances,
      captureWholePage: true,
      themes: bothThemes,
    });
  });
});
