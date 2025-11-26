import { test } from '@playwright/test';
import { justDark, takeScreenshots } from '../../storybook-screenshotter';
import { ComponentInstanceValue, kTextSB } from '../../storybook-components';
import { textTypes } from '../../../src/components/misc/ktext';
import { expandObjectWithArrayValues } from '../../utils/jsobjects';

test.describe('ktext', async () => {
  test('different text types render correctly', async ({ browser }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        type: [...textTypes],
      });
    await takeScreenshots(browser, kTextSB, { componentInstances });
  });
  test('dark mode renders correctly', async ({ browser }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        type: ['h1', 'text', 'link'],
      });
    await takeScreenshots(browser, kTextSB, {
      componentInstances,
      themes: justDark,
    });
  });
});
