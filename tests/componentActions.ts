import { Locator, Page } from '@playwright/test';
import { CaptureFunction } from './storybook-screenshotter';

export type ComponentAction = (
  capture: CaptureFunction,
  page: Page,
  compLoc: Locator,
  frameLoc: Locator
) => Promise<void>;

export const doNothingAction: ComponentAction = async (capture) => {
  await capture('no-action');
};

export const hoverAction: ComponentAction = async (capture, page, compLoc) => {
  await compLoc.hover();
  await capture('hover');
};

export const clickAction: ComponentAction = async (capture, page, compLoc) => {
  await compLoc.click();
  await capture('click');
};

export const forceClickAction: ComponentAction = async (
  capture,
  page,
  compLoc
) => {
  await compLoc.click({ force: true });
  await capture('click');
};
