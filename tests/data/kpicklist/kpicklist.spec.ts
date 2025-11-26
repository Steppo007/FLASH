import { Locator, test } from '@playwright/test';
import { justDark, takeScreenshots } from '../../storybook-screenshotter';
import { ComponentInstance, kPickListSB } from '../../storybook-components';
import { ComponentAction } from '../../componentActions';

async function moveSourceItem(compLoc: Locator, where: string) {
  await compLoc
    .locator(`.p-picklist-source-controls > [aria-label="Move ${where}"]`)
    .click();
}

async function moveTargetItem(compLoc: Locator, where: string) {
  await compLoc
    .locator(`.p-picklist-target-controls > [aria-label="Move ${where}"]`)
    .click();
}

async function transferItem(compLoc: Locator, where: string) {
  await compLoc
    .locator(`.p-picklist-transfer-buttons > [aria-label="Move ${where}"]`)
    .click();
}

async function clickSourceItem(compLoc: Locator, text: string) {
  await compLoc
    .locator('.p-picklist-source-wrapper')
    .getByRole('listbox')
    .getByRole('option')
    .getByText(text)
    .click();
}

async function clickTargetItem(compLoc: Locator, text: string) {
  await compLoc
    .locator('.p-picklist-target-wrapper')
    .getByRole('listbox')
    .getByRole('option')
    .getByText(text)
    .click();
}

async function searchInSourceList(compLoc: Locator, x: string) {
  await compLoc.locator('.p-picklist-source-wrapper').locator('input').fill(x);
}

test('renders correctly in dark theme', async ({ browser }) => {
  await takeScreenshots(browser, kPickListSB, {
    themes: justDark,
    fullScreen: true,
  });
});

test('filter works correctly, and controls are correctly removed', async ({
  browser,
}) => {
  // combining two irrelevant features for more efficient testing
  const componentInstances: ComponentInstance[] = [
    { filterBy: 'name', showSourceControls: false },
    { filterBy: 'country', showTargetControls: false },
  ];

  const action: ComponentAction = async (capture, page, compLoc) => {
    await searchInSourceList(compLoc, 'gdo'); // united kingdom
    await capture('searched-gdo');
    await searchInSourceList(compLoc, 'rwe'); // george orwell
    await capture('searched-rwe');
  };

  await takeScreenshots(browser, kPickListSB, {
    componentInstances,
    fullScreen: true,
    action,
  });
});

test('controls work correctly', async ({ browser }) => {
  const action: ComponentAction = async (capture, page, compLoc) => {
    await clickSourceItem(compLoc, 'Tolstoy');
    await capture('clicked-source-item');
    await moveSourceItem(compLoc, 'Down');
    await capture('moved-source-item-down');
    await moveSourceItem(compLoc, 'Up');
    await capture('moved-source-item-up');
    await moveSourceItem(compLoc, 'Top');
    await capture('moved-source-item-top');
    await moveSourceItem(compLoc, 'Bottom');
    await capture('moved-source-item-bottom');
    await transferItem(compLoc, 'to Target');
    await capture('moved-source-item-to-target');
    await clickTargetItem(compLoc, 'Tolstoy');
    await moveTargetItem(compLoc, 'Up');
    await capture('moved-target-item-up');
    await transferItem(compLoc, 'All to Target');
    await capture('moved-all-source-items-to-target');
  };

  await takeScreenshots(browser, kPickListSB, { fullScreen: true, action });
});
