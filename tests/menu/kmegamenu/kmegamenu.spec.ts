import test from '@playwright/test';
import { ComponentAction } from '../../componentActions';
import { bothThemes, takeScreenshots } from '../../storybook-screenshotter';
import { kMegaMenuSB } from '../../storybook-components';

const MOBILE_PROJECT_NAME = 'Mobile Chrome';

const MobileFriendlyHighlightedInstance = {
  breakpoint: '768px',
  activeId: 'active-video',
};

test.describe('kmegamenu', async () => {
  test('kmegamenu renders correctly on desktop', async ({
    browser,
  }, workerInfo) => {
    test.skip(
      workerInfo.project.name === MOBILE_PROJECT_NAME,
      'this tests the desktop view of the component '
    );

    const componentInstances = [MobileFriendlyHighlightedInstance];
    const action: ComponentAction = async (capture, page, compLoc, bodyLoc) => {
      // hierarchical view
      const buttonsIdx = {
        videos: 0,
        users: 1,
        gamesTabbed: 2,
        simpleButton: 3,
      };

      await compLoc.locator('button').nth(buttonsIdx.videos).hover();
      await capture('desktop-hover-videos-button');
      await compLoc.locator('button').nth(buttonsIdx.videos).click();
      await capture('desktop-videos-menu-expanded');
      await bodyLoc.getByText('Video 1.1 production').hover();
      await capture('desktop-videos-menuitem-hover');
      await bodyLoc.getByText('Video 1.1 production').click();
      await compLoc.locator('button').nth(buttonsIdx.videos).click();
      await capture('desktop-videos-menuitem-active');
      // tabbed view
      await compLoc.locator('button').nth(buttonsIdx.gamesTabbed).hover();
      await capture('desktop-tabbed-menu-expanded');
      await bodyLoc.locator('a:has-text("Level 1.1.1")').hover();
      await capture('desktop-tabbed-menuitem-hover');
      await bodyLoc.getByText('Game 2').click();
      await capture('desktop-tabbed-2-category-active');
      await bodyLoc.getByText('Level 2.3').click();
      await compLoc.locator('button').nth(buttonsIdx.gamesTabbed).click();
      await bodyLoc.getByText('Game 2').click();
      await capture('desktop-tabbed-menuitem-active');
      await bodyLoc.getByText('Level 2.1', { exact: true }).hover();
      await capture('desktop-tabbed-menuitem-category-link-no-highlight');
      // simple button
      await compLoc.locator('button').nth(buttonsIdx.simpleButton).hover();
      await page.waitForTimeout(300);
      await capture('desktop-no-overlay-for-simple-button');
      await compLoc.locator('button').nth(buttonsIdx.simpleButton).click();
      await compLoc.locator('button').nth(buttonsIdx.gamesTabbed).hover();
      await capture('desktop-after-selecting-simple-overlay-hidden');
    };

    await takeScreenshots(browser, kMegaMenuSB, {
      componentInstances,
      action,
      themes: bothThemes,
      captureWholePage: true,
      fullScreen: true,
      compLocator: '.kro-d-kmegamenu',
    });
  });

  test('kmegamenu renders correctly on mobile', async ({
    browser,
  }, workerInfo) => {
    test.skip(
      workerInfo.project.name !== MOBILE_PROJECT_NAME,
      'this tests the mobile view of the component '
    );

    const componentInstances = [MobileFriendlyHighlightedInstance];
    const c = {
      mainButton: 'button.kro-knavitem',
      videoBranchButton: 'li#videos',
      videoItem: 'li#active-video',
      tabbedBranchButton: 'li#games',
      actionSelector: '.kro-kactionselector',
      gameSelectorButton: '.kro-kactionselector-header button',
      gamesSelectList: '.kro-kselectlist',
      optionGame2: 'Game 2',
      actionSelectorButton: '.kro-kactionselector-button',
      simpleButton: 'li#simple-button',
      backtoTopMenuButton: '.kro-menu-sidebar-header-start',
      kronesLogo: 'krones-logo',
    } as const;

    const action: ComponentAction = async (capture, page, compLoc, bodyLoc) => {
      await compLoc.nth(0).hover();
      await capture('mobile-hover-menu-button-icon');
      await compLoc.nth(0).click();
      await capture('mobile-click-menu-button-icon');
      await bodyLoc.locator(c.videoBranchButton).nth(0).hover();
      await capture('mobile-sidebar-top-menu-hover');
      await bodyLoc.locator(c.videoBranchButton).nth(0).click();
      await bodyLoc.locator(c.videoItem).nth(0).hover();
      await capture('mobile-sidebar-sub-menu-hover');
      await bodyLoc.locator(c.videoItem).nth(0).click();
      await compLoc.nth(0).hover();
      await capture('mobile-went-through-link');
      await compLoc.nth(0).click();
      await bodyLoc.locator(c.videoItem).nth(0).hover();
      await capture('mobile-sidebar-sub-menu-item-active');
      await bodyLoc.locator(c.backtoTopMenuButton).nth(0).hover();
      await capture('mobile-sidebar-sub-menu-back-hover');
      await bodyLoc.locator(c.backtoTopMenuButton).nth(0).click();
      await bodyLoc.getByTestId(c.kronesLogo).nth(0).hover();
      await capture('mobile-sidebar-top-menu-logo-hover');
      await bodyLoc.getByTestId(c.kronesLogo).nth(0).click();
      await compLoc.isVisible();
      await capture('mobile-menu-button-icon');

      // tabbed view
      await compLoc.nth(0).click();
      await bodyLoc.locator(c.tabbedBranchButton).nth(0).click();
      await bodyLoc.locator(c.actionSelector).first().isVisible();
      await capture('mobile-menu-tabbed-menu');
      await bodyLoc.locator(c.gameSelectorButton).nth(0).click();
      await bodyLoc.locator(c.gamesSelectList).first().isVisible();
      await capture('mobile-menu-tabbed-select-list-shown');
      await bodyLoc
        .locator(c.gamesSelectList)
        .getByText('Game 2')
        .first()
        .click();
      await bodyLoc
        .locator('.kro-kactionselector-mask')
        .nth(1)
        .waitFor({ state: 'hidden' });
      await capture('mobile-menu-tabbed-category-changed');
      await bodyLoc.locator(c.actionSelectorButton).first().click();
      await capture('mobile-menu-tabbed-selector-button-hides-sidebar');

      // simple button
      await compLoc.nth(0).click();
      await bodyLoc.locator(c.backtoTopMenuButton).nth(0).click();
      await bodyLoc.locator(c.simpleButton).nth(0).click();
      await compLoc.nth(0).click();
      await capture('mobile-menu-simple-button-active');
    };

    await takeScreenshots(browser, kMegaMenuSB, {
      componentInstances,
      action,
      captureWholePage: true,
      fullScreen: true,
      compLocator: c.mainButton,
    });
  });
});
