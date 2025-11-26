# Contribute a New Component to the Library

This document gives you step-by-step instructions for how to contribute a new component to our component library.

## Step 1: Familiarise Yourself with the Repository

Make sure you have read the root level README.md (specifically the section for developers) to familiarise yourself with the repository.

## Step 2: View the Component in Figma and PrimeReact

### Open the Figma

Open the [Core Library](https://www.figma.com/file/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?type=design&node-id=156-14265&mode=design&t=MjGIiV12ZJ8lMQLW-0) in Figma.

### Find your Component

On the left, you will see a navigation bar with the different pages. There are pages for components as well as other things like typography, colors, etc. For example, in the category labelled `FORM` you will find a component called `Checkbox`. Find the component that needs to be built, and open the page.

### Enable Dev Mode

To get full access to the development features of Figma, you need to enable dev mode. In the top right corner of the page, you will see a toggle button with a tooltip that says `Dev Mode`. Switch this on. Your account may not be licensed to access dev mode. In that case, please get in touch with Tribe 17 to enable this feature.

### Examine Your Component in Figma

In the documentation for the component, you will find the different states and variants displayed. Get an overview of all the different functionality this component should have. If you click on the component under the "Showcase", you should see an option to "Open in Playground", in the dev mode panel on the right. Here you can tinker around with all the different attributes, and see their effect on the component.

### Examine Your Component in PrimeReact

Most components will have a link to a [PrimeReact](https://primereact.org) component, which can be found in the dev mode panel on the right. You should use this PrimeReact component to build your component, to avoid needing to implement all the functionality from scratch. Visit the PrimeReact documentation, and familiarise yourself with all the features and functionality offered by the PrimeReact component.

## Step 3: Create a New Component

We have written a script to help get you started with all the necessary boiler-plate code. Simply run the command `npm run new:comp`. (You need to pass additional parameters, but the script will tell you how).

The script generates boiler-plate code in the component library, the storybook, and the test directory. It also hooks the storybook up with the component and its styles, so you can see it immediately in the storybook.

### Run Storybook and See Your Component

Run `npm run sb` to run the storybook (of course, must have already run `npm install`). You should see your new component in the side navigation. When you click on the `docs` page for the component, you should see the rendered component and a control panel which allows you to edit the label.

## Step 4: Develop the Component

Now that we've got everything hooked up, you can develop your component and see changes in real time.

### Refer to Existing Components

When building your component, it will be useful to refer to existing components. One good example is the Krones `KInputDropdown` which uses the PrimeReact `Dropdown` (documentation [here](https://primereact.org/dropdown)). This shows you how to make use of PrimeReact.

### Define Type for Component Attributes

Inside `types.ts`, let your component props (e.g. `KCheckboxProps`) extend the PrimeReact interface for the given component (e.g. `CheckboxProps`). You can add custom properties which are demanded by the figma mock-ups but not supported by PrimeReact (e.g. `size`).

### Wrap PrimeReact Component

Inside `comp.tsx`, make your Krones component return the PrimeReact component and forward any props coming from PrimeReact to the component. You can add extra logic here which takes custom attributes (e.g. `size`) and adds corresponding class names which can then be selected for in the CSS. Every component will be slightly different, and, in order to meet the demands of the Figma mock-ups, feel free to be creative and take some liberties. At this point, you may like to see what the component looks like in storybook. You may need to change the `args` object in the `comp.stories.tsx` file, and also have a look at the PrimeReact documentation to what arguments the component actually needs.

### Start Styling your Component

Inside `styles.css`, you can start writing some CSS to style the component. This is also a creative process, and there is no hard-and-fast rule for what kinds of selectors you should use. Here are some ideas:

- Examine the mark up in your dev tools to see what kinds of flags are added by PrimeReact. You might see things like `aria-expanded=true` or `data-p-focused=false` or `data-pc-section=menuitem`. Whenever possible, make use of these to customise your component's styles, rather than building custom solutions.
- For custom funcationality, use the attributes passed to your component to add custom class names, and select for these in your CSS.
- Use the so-called "pass-through options" to add class names (or other properties) to sub-elements of the PrimeReact component. See the [section](#use-pass-through-options-if-necessary) below for more details.

### Important Styling Considerations

When styling your component, please keep the following important points in mind:

##### 1. No Side Effects

Make sure the CSS you write has no "side-effects", i.e. it should only apply to the particular component you are building. One way to do this is to prefix your class names with `kro-`, like in `kro-kcheckbox`, and ensure all styles apply to only this component or its children. These styles are imported in the FLASH, so if you use generic selectors like `li`, for example, then this would potentially affect all `li` elements in the FLASH.

##### 2. Use CSS Nesting

[CSS Nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/Nesting_selector) is supported by all modern browsers and can make your CSS much more readable. The following code uses CSS nesting:

```
.kro-kcheckbox {

  [data-pc-section=input] {
    color: var(--checkbox-color)

    &:hover {
      color: var(--checkbox-color-hover)
    }

    &:focus {
      color: var(--checkbox-color-focus)
    }
  }
}
```

This is equivalent to the following:

```
.kro-kcheckbox [data-pc-section=input] {
    color: var(--checkbox-color)
}

.kro-kcheckbox [data-pc-section=input]:hover {
    color: var(--checkbox-color-hover)
}

.kro-kcheckbox [data-pc-section=input]:focus {
    color: var(--checkbox-color-focus)
}
```

Using CSS nesting is, on a large scale, much more readable and maintainable, because it effectively groups similar ideas together. Take a look at the existing CSS to see what a difference it makes.

##### 3. Use Design Tokens from Figma

When coding sizes and colors in your CSS, avoid using explicit "pixel" values or hex-codes. Instead, use the tokens that you find in the Figma. For example,

- `padding: var(--space-2)` is preferred over `padding: 8px`
- `width: var(--size-12)` is preferred over `width: 48px`
- `color: var(--surface-interactive-hover)` is preferred over `color: #028492`
- for font sizes, don't worry about using tokens. Just make sure to use `rem` instead of `px`.

There are many benefits to using tokens over explicit values:

- the space/size tokens are backed by `rem` values instead of `px`, ensuring accessibility
- the space/size tokens are backed by a spacing pallete with a small set of defined spacings, ensuring a more uniform UI
- the color tokens are backed by colors which change according to the theme, so you don't have to worry about different themes in your CSS
- the color tokens are backed by the Krones color pallete, ensuring a more uniform UI
- new color token defintions can be imported from the design team without requiring any changes to the CSS

Also important to keep in mind: even when two tokens happen to be valued with the same color, you should still make sure to use BOTH tokens in the CSS. For example, even if `var(--checkbox-color-hover)` and `var(--checkbox-color-focus)` happen to be the same color, you should still use the following CSS

```
.kro-kcheckbox:hover {
  color: var(--checkbox-color-hover);
}

.kro-kcheckbox:focus {
  color: var(--checkbox-color-focus);
}
```

instead of

```
.kro-kcheckbox:hover, .kro-kcheckbox:focus,  {
  color: var(--checkbox-color-hover);
}
```

##### 4. No Tailwind in Components

Avoid using Tailwind class names in the components themselves. Although it might look like they have the desired effect, this is only because we use Tailwind in Storybook. The components themselves should be Tailwind-agnostic.

### Use Pass-Through Options if Necessary

PrimeReact exposes an interface called [Pass-Through Options](https://primereact.org/passthrough) which allows you to programmatically access certain subelements of PrimeReact components at runtime, and add your own customer class names (or even other properties like transitions and inline styles).

If you would like to use these, add a file called `pt.ts` in the component directory. Again, make sure you forward-export this in `index.ts`. Inside `pt.ts` export a function that returns pass-through options for your component. You can even require arguments in this function for extra customisation.

Use cases:

1. **Accessing Subelements**: All of the following use cases assume you need access to subelements. If you just need access to the root element, you can pass properties directly to the PrimeReact component.
1. **Global Styles**: There are certain cases where you might want to create a custom class name that is used across multiple components. In this case, add this style in `css/globals.css`, and add a class name to the subelement inside the pass-through options which is selected by the global style.
1. **Reuse Existing Components**: There are certain PrimeReact components which have subcomponents that are themselves PrimeReact components. For example, the `DataTable` has a `Paginator` which has a `Dropdown`. Suppose you have already built the `Dropdown`, and you now want to build the `Paginator`. In this case, you can use the pass-through options in the `Paginator` to directly apply the existing styles fro the `Dropdown`, without any code-duplication.
1. **Access State at Runtime**: Sometimes it is more convenient to access the state and props of the component at runtime, and you can do this with callbacks inside the pass-through options.

## Step 5: Construct the Storybook Documentation

Spend some time looking at the existing code and documentation online to become familiar with Storybook. I would recommend opening storybook, either locally or in the [cloud](https://styleguide.productiontools.dev.krones.world/) to see how the documentation pages are built, and what all is possible. Some important things to include are:

1. a link to the PrimeReact component, as done in the other pages.
1. a code snippet to demonstrate usage of the component in context
1. optionally, include the actual rendering of the code snippet in the page itself.
1. descriptions for the attributes shown in the "control panel." These are read directly from the TS Docs in the type definitions for the component attributes (i.e. `types.ts`). Alternatively, for properties taken from PrimeReact and not overriden, you can add descriptions in the storybook metadata for the component.
1. a link to the Figma page in the component metadata

## Step 6: Write Playwright Tests for the Component

We run playwright tests which open up the storybook page in a browser and take screenshots of the components in their different variants and states. These screenshots are compared against existing reference screenshots, ensuring there are no regressions in appearance.

### Specify Default Properties

Go to `tests/storybook-components.ts`. Your new component should have already been "registered" here. Add values for all properties to the `defaultProps` object. These will be those used during testing whenever not overwritten.

### Write Tests

There should be a file called `{category}/{component}/{component}.spec.ts`. In here you should write some snapshot tests. Again, follow the existing examples, which use helper functions defined in `tests/storybook-screenshotter`.

IMPORTANT: be efficient! The snapshot tests are rather slow, and every screenshot you add takes up time. Yes, we don't want to be stingy with our snapshots, because we do really want to test the component in its entirety. But you should think about what different combinations of properties are the most meaningful to test.

For example, instead of testing all four sizes of the avatar in BOTH light and dark mode, we just test all four in light mode, and only one in dark mode. This doesn't compromise on the power of the test at all, since size and dark-mode appearance are compeletly orthogoanl properties.

### Test Actions

You can also interact with the component before taking screenshots. For example, if the component is checkbox, then you may want to click on it so that it is checked, and then take a screenshot. You can do this with the `ComponentAction` type. There are some predefined actions in `tests/componentAction.ts` but you may also need to define your own custome actions.

### Run the Tests

To run your tests, you can do `bash tests/ci-runner -- tests/{category}/{component}/{component}.spec.ts`. To run all the tests, just run `bash tests/ci-runner`, but beware, this will take a while! Read the section about tests in the root level README.md for some extra information.

During the first test run, the snapshots will be generated, and the playwright tests will be marked as "failing" because they didn't have snapshots to compare to. If you run the tests a second time, they should then all pass. Examine the screenshots generated in `{component}.spec.ts-snapshots` and make sure they look as expected, before committing them to version control.

After any test run, you can always view the html report stored in `tests/reports/html/index.html`. In case of snapshot mismatches, you will be able to see the differences here.

## Step 7: Open a PR

Open up a pull request with your new component and wait for feedback.
