import { test } from '@playwright/test';
import { bothThemes, takeScreenshots } from '../../storybook-screenshotter';
import {
  ComponentInstanceValue,
  kTreeTableSB,
} from '../../storybook-components';
import { ComponentAction } from '../../componentActions';
import { expandObjectWithArrayValues } from '../../utils/jsobjects';

test.describe('ktreeTable', () => {
  test('treeTable renders correctly', async ({ browser }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        scrollable: [true, false],
      });

    await takeScreenshots(browser, kTreeTableSB, {
      componentInstances,
      themes: bothThemes,
      captureWholePage: true,
      fullScreen: true,
    });
  });

  test('treeTable with single selection mode works correctly', async ({
    browser,
  }) => {
    const componentInstances = [{ selectionMode: 'single', scrollable: false }];

    const action: ComponentAction = async (capture, page, compLoc) => {
      // Click on the first row
      await compLoc.locator('tbody tr:first-child').click();
      await capture('first-row-selected');

      // Click on the second row to show that selection changes
      await compLoc.locator('tbody tr').nth(1).click();
      await capture('second-row-selected');
    };

    await takeScreenshots(browser, kTreeTableSB, {
      componentInstances,
      action: action,
      captureWholePage: true,
      fullScreen: true,
    });
  });

  // Separate test for multiple selection mode
  test('treeTable with multiple selection mode works correctly', async ({
    browser,
  }) => {
    const componentInstances = [{ selectionMode: 'multiple' }];

    const multipleSelectionAction: ComponentAction = async (
      capture,
      page,
      compLoc
    ) => {
      // Click on the first row
      await compLoc.locator('tbody tr:first-child').click();
      await capture('first-row-selected');

      const secondRow = compLoc.locator('tbody tr').nth(1);
      await page.keyboard.press('Control');
      await secondRow.click();
      await page.keyboard.up('Control');
      await capture('multiple-rows-selected');
    };

    await takeScreenshots(browser, kTreeTableSB, {
      componentInstances,
      action: multipleSelectionAction,
      captureWholePage: true,
      fullScreen: true,
    });
  });

  test('treeTable with checkbox selection mode works correctly', async ({
    browser,
  }) => {
    const componentInstances = [
      { selectionMode: 'checkbox', scrollable: false },
    ];

    const checkboxSelectionAction: ComponentAction = async (
      capture,
      page,
      compLoc
    ) => {
      // Click on the first row's checkbox
      const firstRowCheckbox = compLoc
        .locator('tbody tr')
        .first()
        .locator('td:first-child .p-checkbox');
      await firstRowCheckbox.click();
      await capture('first-row-checkbox-selected');

      // Click on second row's checkbox to add to selection
      const secondRowCheckbox = compLoc
        .locator('tbody tr')
        .nth(1)
        .locator('td:first-child .p-checkbox');
      await secondRowCheckbox.click();
      await capture('multiple-rows-selected');
    };

    await takeScreenshots(browser, kTreeTableSB, {
      componentInstances,
      action: checkboxSelectionAction,
      captureWholePage: true,
      fullScreen: true,
    });
  });
});
