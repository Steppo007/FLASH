import { Page } from '@playwright/test';

export async function makeStorybookFullScreen(page: Page) {
  const fullScreenButton = page.getByLabel('Go full screen');
  const canGoFullScreen = await fullScreenButton.isVisible();
  if (canGoFullScreen) await fullScreenButton.click();
}
