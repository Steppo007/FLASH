import { test } from '@playwright/test';
import { expandObjectWithArrayValues } from '../../utils/jsobjects';
import {
  ComponentInstanceValue,
  kProductCardSB,
} from '../../storybook-components';
import { bothThemes, takeScreenshots } from '../../storybook-screenshotter';

test.describe('kproductcard', async () => {
  test('header renders correctly', async ({ browser }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        header: ['none', 'img', 'svg'],
      });
    await takeScreenshots(browser, kProductCardSB, {
      componentInstances,
      themes: bothThemes,
    });
  });
  test('footer renders correctly', async ({ browser }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        footer: ['none', 'primary', 'primary and secondary'],
      });
    await takeScreenshots(browser, kProductCardSB, { componentInstances });
  });
  test('title renders correctly', async ({ browser }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        title: [
          'Short Title',
          'Slightly Longer Title',
          'A Really Very Super Extremely Long Title',
        ],
      });
    await takeScreenshots(browser, kProductCardSB, { componentInstances });
  });
});
