import test, {
  Browser,
  BrowserContext,
  Locator,
  expect,
} from '@playwright/test';
import {
  ComponentInstance,
  ComponentInstanceValue,
  StorybookComponent,
  defaultComponentInstance,
} from './storybook-components';
import hash from 'object-hash';
import { makeStorybookFullScreen } from './utils/storybook';
import { ComponentAction, doNothingAction } from './componentActions';

/**
 * This module contains an interface which allows tests to interact with the
 * Storybook controls, in order to take snapshots of the different variants
 * and states of a component.
 */

/**
 * Options to pass to the screenshot function. For default values, see
 * the globalConfig object in this file
 */
export interface ScreenshotOptions {
  /**
   * each component instance is a javascript object which maps the properties of the component,
   * AS THEY APPEAR IN STORYBOOK, to the values that they should take for the given snapshot.
   */
  componentInstances?: ComponentInstance[];
  /**
   * which themes to take the snapshot in
   */
  themes?: Theme[];
  /**
   * the action to perform on each element, which also specifies in which moments
   * to capture the screenshots, and what name to tag them with
   */
  action?: ComponentAction;
  /**
   * whether or not the screenshot should be of the whole page. Otherwise, it
   * defaults to just the component.
   */
  captureWholePage?: boolean;
  /**
   * whether or not storybook should go full screen. You might need this for some
   * of the larger components and flyouts to fit in the image.
   */
  fullScreen?: boolean;

  /**
   * the custom locator to be used to select the component
   * best works for complex components that are internally made of multiple ones
   * @default .kro-${component.name}
   */
  compLocator?: string | Locator;
}

/**
 * A function which takes screenshots of a component.
 *
 * @param browser the object used by Playwright to represent a browser
 * @param component an object with data about the storybook component to be tested
 */
export async function takeScreenshots(
  browser: Browser,
  component: StorybookComponent,
  options?: ScreenshotOptions
) {
  // override default options with given options
  const {
    componentInstances,
    themes,
    action,
    captureWholePage,
    fullScreen,
    compLocator,
  }: ScreenshotOptions = {
    ...globalConfig.defaultScreenshotOptions,
    ...options,
  };

  // take the screenshots
  for (const theme of themes) {
    if (theme === 'dark' && test.info().project.name.includes('Mobile')) {
      // skipping dark mode snapshots for mobile, they do not work :-(
      // TODO: fix
      continue;
    }

    // create new page with given color theme
    const context = await browser.newContext({ colorScheme: theme });

    for (const componentInstance of componentInstances) {
      await takeScreenshot(
        context,
        component,
        componentInstance,
        theme,
        action,
        captureWholePage,
        fullScreen,
        compLocator
      );
    }

    await context.close();
  }
}

/**
 * @param browser the object used by Playwright to represent a browser
 * @param component an object with data about the storybook component to be tested
 */
async function takeScreenshot(
  context: BrowserContext,
  component: StorybookComponent,
  componentProps: ComponentInstance,
  theme: Theme,
  action: ComponentAction,
  captureWholePage: boolean,
  fullScreen: boolean,
  locator?: string | Locator
) {
  const page = await context.newPage();

  // get the properties specified for this screenshot, overriding default values wherever possible
  const fullComponentProps = { ...component.defaultProps, ...componentProps };

  // navigate to the page which has the component with the desired props
  const urlForComponentInstance = getUrlForComponentInstance(
    component,
    fullComponentProps
  );
  await page.goto(urlForComponentInstance);
  if (fullScreen) await makeStorybookFullScreen(page);

  // get locators for frame and component
  const frameLoc = page.frameLocator(globalConfig.iFrameSelector);

  await expect(frameLoc.locator('html')).toHaveAttribute('data-theme', theme);

  const bodyLoc = frameLoc.locator('body');
  const componentLoc = bodyLoc.locator(locator ?? `.kro-${component.name}`);

  // method to be called by the person providing the action
  const capture: CaptureFunction = async (tag: string, target?: Locator) => {
    const outputFile =
      component.name +
      '-' +
      hash(fullComponentProps).slice(0, 12) +
      '-' +
      theme +
      '-' +
      tag +
      '.png';
    const options = globalConfig.toHaveScreenshotOptions;
    const screenshotTarget =
      target ?? (captureWholePage ? bodyLoc : componentLoc);
    await expect(screenshotTarget).toHaveScreenshot(outputFile, options);
  };

  // action to perform on the component, which can capture screenshots at arbitrary moments
  await action(capture, page, componentLoc, bodyLoc);

  await page.close();
}

/**
 * @param component the storybook component
 * @param props the particular instance with specific attributes
 * @returns the url which navigates to that component with those attributes selected
 */
function getUrlForComponentInstance(
  component: StorybookComponent,
  props: ComponentInstance
) {
  const safeToString = (obj: ComponentInstanceValue) => {
    return obj === undefined ? 'undefined' : obj.toString();
  };

  return (
    getPathToStory(component) +
    '&args=' +
    Object.keys(props)
      .map((key) => {
        return key + ':' + safeToString(props[key]) + ';';
      })
      .join('')
  );
}

/**
 * Gets path to the page which contains the controls for the component.
 */
function getPathToStory(component: StorybookComponent) {
  return `/?path=/story/components-${component.category}-${component.name}--story`;
}

export type CaptureFunction = (tag: string, target?: Locator) => Promise<void>;

export type Theme = 'light' | 'dark';
export const bothThemes: Theme[] = ['light', 'dark'];
export const justLight: Theme[] = ['light'];
export const justDark: Theme[] = ['dark'];

/**
 * configuration which remains constant over
 * all snapshot tests.
 */
export const globalConfig = {
  /**
   * the css selector which finds the iFrame element
   * in the storybook page
   */
  iFrameSelector: '#storybook-preview-iframe',
  /**
   * options to pass to the toHaveScreenshot method from playwright
   */
  toHaveScreenshotOptions: {
    maxDiffPixels: 0,
    timeout: 60 * 1000,
  },
  /**
   * default value for ScreenshotOptions object
   */
  defaultScreenshotOptions: {
    componentInstances: defaultComponentInstance,
    themes: justLight,
    action: doNothingAction,
    captureWholePage: false,
    fullScreen: false,
  },
};
