# FLASH UI Component Library

The FLASH UI Component Library is a React component library to be used by newly created web applications in the Krones ecosystem. It makes use of React components built by PrimeReact and adds custom styling with CSS, in accordance with the Krones Design System.

# For Everyone

## Configure NPM access

In order to install NPM packages via our JFrog repository, you will need to set up access:

- Provide NPM with an access token to [JFrog](https://syskronx.jfrog.io):

```
npm login --registry=https://syskronx.jfrog.io/artifactory/api/npm/npm/ --auth-type=web
```

- Set your default NPM registry to the Krones JFrog:

```
npm config set registry https://syskronx.jfrog.io/syskronx/api/npm/npm/
```

- For more information, log in to JFrog, click on the 'Welcome' tab in the top right corner, then 'set me up,' and then 'npm', and read the documentation.

# For Users of the Library

Please visit our [Storybook](https://styleguide-flash.share2act-dev.io/), which is hosted on AWS.

# For Developers of the Library

## Prerequisites

Node.js and the npm package manager are required. Recommendation: Use a node version manager like [fnm](https://github.com/Schniz/fnm) to automatically work with the node version specified in the [.node-version](./.node-version) file.

**For maintainers:** The docker images for CI and the production build should use the same node version.

## Quick Start

- Ensure you have JFrog set up (see the section 'For Everyone' above)
- From the root of the repository, install husky commit hooks with `npm install`
- Launch Storybook with `npm run sb`, to interact with the components.

## Useful Links

- [Bitbucket](https://pd.bitbucket.syskron.com/projects/KOP_APP_SHELL/repos/flash.ui-components/browse)
- [Jenkins](https://s2a-jenkins.tools.krones.digital/job/KOP.app-shell/job/flash.ui-components/)
- [JFrog](https://syskronx.jfrog.io)
- [Confluence](https://krones-digital.atlassian.net/wiki/spaces/DEV/pages/20334267/F17+Public)

## Repository Structure

This repository contains two main projects: the component library itself, and the storybook which is used to display those components. ([Here's](https://krones-digital.atlassian.net/wiki/x/JAXaAw) why we have both in the same repository.)

- flash.ui-components
  - build
    - components
    - storybook
  - src
    - components
    - storybook
  - tests

### Structure of Component Library

All code for the components is located in `src/components`. We ask that developers respect the existing structure to this directory. At the first layer, we have categories of components. Within each category are directories for the components themselves. Within each component directory, there are a number of different files:

- `comp.tsx` exports the react component itself
- `types.ts` contains type definitions related to the component.
- `styles.css` contains the css for the component
- If the component uses primereact, there might also be a file called `pt.ts` containing the pass through options
- `index.ts` simply exports all of the other files, allowing users of the component library to import from the path `@flash/ui-components/category/component`.

Note, all the css files in the dirctory `src/components` are collected during the build and merged into a single css file: `flash.css`. You can read more about the build process below.

## Build

### Component Library

run

```
npm run build:cl
```

This will create output in the directory `build/components`, including a tar file which is then published to our NPM registry on JFrog. There is more information about the packaging of our library in later sections.

### Storybook

run

```
npm run build:sb
```

This will create output in the directory `build/storybook`, which is then published to an AWS server.

### Combined

The two build process are completely independent from one another. However, should you like to run both at the same time, you may simply run

```
npm run build
```

## Serve Storybook

The Storybook project can be served in two ways:

- For the dev server, run `npm run sb`
- For the production server, run `npm run serve:sb` (this will serve the output of `npm run build`)

## Playwright Snapshot Tests

Our components are tested with snapshot tests using Playwright. To run the tests, simply run

`npm run test`

These snapshot tests take screenschots of the different components (and their variants), as they appear in storybook. The tests also perform certain actions (clicking on items, opening menus) to ensure the components behave as expected.

The command `npm run test` will serve the storybook bundle and run the tests inside a docker container.

The entire test suite takes quite a lot of time (20+ minutes) so you will usually want to run only certain tests. You can do this by passing additional [CLI options](https://playwright.dev/docs/test-cli). For example,

- `npm run test -- --project=chromium` will run the tests only for the chromium browser
- `npm run test -- tests/button/kbutton` will run the tests only for the KButton component.

### Why A Docker Container

It is important to run the tests in the docker container. We use a zero-tolerance threshold for our snapshot tests (i.e. 100% of the pixels must match). Therefore, even slight variations in the browser version, environment, or operating system can cause the tests to fail. The docker container ensures consistency. We use the official Playwright docker images published by Microsoft, pinning the Playwright version to the one which is locked inside our `package-lock.json`. This image has pinned versions of browsers pre-installed as well.

### Headed Mode

For debugging purposes, it is sometimes useful to run the tests in "headed" mode, where you can see the tests being run in browser windows. For this, you will need to run the tests outside of the docker container. You can do this by running the command `npx playwright test --headed` with any additional CLI arguments. You will likely also want `--workers=1`, to avoid parallelisation.

If you already have a server listening on `localhost:6006`, the tests will run against this. Otherwise, the storybook bundle from the previous `npm run build` will be served at this location, and the tests will be run against it.

### Tests in the Pipeline

The snapshot tests are run in the pipeline to ensure there are no regressions. However, the entire test suite takes quite a while, and it would be annoying to need to wait 20+ minutes after every push. Hence, on pushes to feature branches, we only run the chromium tests, which currently typically finish in 5 minutes. Feature branches are allowed to be merged into main when the chromium tests are passing.

In order to test the other browsers, we also run the pipeline nightly on the `main` branch. During the nightly pipeline, the entire test suite is run, new snapshots are generated for failing tests, these updated snapshots are added to a new branch, and a pull request is automatically opened in BitBucket. As a result, if there were any failures overnight, we will be notified in the morning with a pull request, and the new images can be inspected directly in BitBucket.

## Local Testing

This repository is designed so that components are very easy to test locally. You can work on components and see them updated directly in storybook.

However, if you

1. are developing another project which uses our component library, and
2. are making changes to the component library, and
3. would like to see how those changes behave in the other project, then

it may be useful to import the current local version of the component library in your other project. You can do this with the command `npm run export path/to/your/project`. Note, this script will modify the `package.json` and `package-lock.json` in your other project, so if you have any concerns, take a look inside the script.

## Automatic Code Generation

Any file that looks like `[file].autogen.[ext]` is generated automatically via the script `npm run gen` and is excluded from version control. In any such file, you will see a comment at the top referencing the script which generated it. This automatic code generation takes place immediately after installation, as well as before any build. It currently includes the following files:

### `npm run gen:tailwind` generates `tailwind.colors.autogen.ts`

We have two different mechanisms for using Krones color tokens. One is by referencing the CSS variables in `css/colors.css` (this is the source of truth), e.g. with `background-color: var(--surface-default).` This is how it is done inside the component library itself. The other option is to reference a tailwind utility class, e.g. `className="bg-surface-default"`. This is how it done inside storybook code, and inside applications which use the component library.

However, the second method relies on the tokens being present in the tailwind configuration `tailwind.config.ts`. In order to keep the values in the configuration in sync with the source of truth (the CSS variables), we use the script `npm run gen:tailwind`.

Note, this script will probably become obsolete with the migration to Tailwind 4, which is based on a CSS-native configuration (and automatically generates CSS variables behind the scenes).

### `npm run gen:version` generates `versions.autogen.ts`

In our Storybook, we want to be able to display the current version of the component library, as well as the version of PrimeReact being used in the library. It is difficult to do this without a code generation step. The script `npm run gen:version` reads the `package-lock.json` to determine the desired version numbers, and writes a file `versions.autogen.ts` which then exports these two version numbers. These values are then imported into one of our Storybook `.mdx` files.

### `npm run gen:svg` generates `svgComponents.autogen.ts`

We have a collection of SVG files in `assets/svgs`. We would like to display all the SVGs in the Storybook, so that if an SVG file gets added to the directory, it is automatically included in the Storybook as well. We do this with the help of a script which scans the directory `assets/svgs` to generate a file `svgComponents.autogen.ts` which exports some lists of SVG names, as well as function which maps these to ready-to-use react components.

## Storybook Code-Snippet Generation

In our Storybook, we would like to display code snippets which demonstrate usage of the components. Simultaneously, we would like to actually render the result of these code snippets inside Storybook. In order to keep the rendered components in sync with the code snippets, you can use the command `npm run sync:docs`.

Here is how to write your own examples for the Storybook documentation. For any component to be shown inside storybook, we have a file called `docs.mdx`. Next to this, you can create your own example, let's say in a file called `example.tsx`, with the following contents:

```jsx
import { KButton } from '@root/src/components/button/kbutton';
import { ExampleWrapper } from '@root/src/storybook/utils';

export function Example() {
  return (
    <ExampleWrapper className="flex justify-center">
      <KButton label="Krones" />
    </ExampleWrapper>
  );
}
```

In order to render this example in the Storybook documentation, simply import the component inside `docs.mdx`, and render it wherever you like:

```jsx
import { Example } from './example';

// ...

<Example />;
```

You can then render a code snippet which displays the exact code from the example, by including the following lines inside `docs.mdx` (using a suitable path pointing to the file which should be injected):

```
[comment]: # (START WRITE ./example.tsx)
[comment]: # (END WRITE)
```

You can then run the command `npm run sync:docs`, and this will inject the code directly into the `docs.mdx` file. This is an idempotent operation.

## Packaging of the Component Library

As already mentioned, running the command `npm run build:cl` will build and package the component library. Here is a breakdown of the steps involved:

- perform any automatic code generation with `npm run gen:svg`
- invoke the typescript compiler (as configured in `tsconfig.complib.json`) to compile the component library, producing output in `build/components`
- invoke our packaging script with `npm run package`, which does the following:
  - compile all the css in the library into a single file called `flash.css`
  - copy static content into the build directory, including our tailwind configuration and `assets` directory (containing SVGs)
  - run `npm pack` on the contents of the build directory, producing a tar ball

The tar ball produced by the packaging step above is then published to our npm repository whenever, in the Jenkins pipeline, `semantic-release` determines a new version should be released.

## Contributing a New Component

To contribute a new component to the library, please read the documentation in `contributing.md`.

## Adding SVGs to the Library

Users of the component library are supposed to also make use of SVGs exported by the library. How exactly this can be done is explained in the [Storybook](https://styleguide.productiontools.dev.krones.world/?path=/docs/general-5-using-svgs--docs). From time to time, other teams will need an SVG which is not in our library. In that case, a pull request should be opened which adds the SVG to the appropriate directory in `assets/svgs`. Here is a description of the directories:

- `icons`: these are generic icons, like a gear to represent settings, or a trash can to represent deleting. These are always monochromatic.
- `products`: these are icons specifically used to represent a given product. The name of the icon should match the name of the product. These are always monochromatic.
- `other`: these are icons which don't fit any of the above categories (maybe because they are not monochromatic)

If you have the need to fix use SVGs inside the components, then the approach of importing from `@root/assets/...` will not work for now because the library is not bundled.
The current workaround is to add the SVG to the svg-workaround sub-folder.

IMPORTANT: In monochromatic icons, the property `fill` MUST take either the value `currentColor` or `none`. It should NOT take a hard-coded hex value. This way, the color of the icon will be the current text color. Since text colors are usually specified by Krones design tokens, this allows the SVGs to change color in different themes.

## Design Tokens

[Design Tokens](https://m3.material.io/foundations/design-tokens/overview) are "small, reusable design decisions that make up a design system's visual style" (material design). The Krones design system uses design tokens, and since our component library is meant to be an implementation of the Krones design system, we also make use of these tokens.

There are two kinds of tokens that we use:

- spacing tokens can be found in `css/spacings.css`. These are rather set in stone, and will likely never have to be updated.
- color tokens can be found in `css/colors.css`. These do need to be updated periodically.

### Updating Color Tokens

To update the color tokens, follow these steps:

- Get in touch with a member of the design team. Currently the point of contact is Stefan Koch.
  - ask them to give you the latest exports of the current color tokens
  - these should include primary tokens, semantic tokens, and component-specific tokens
  - they should be given in the CSS format, without fallback values
- Copy these values temporarily into a file called `css/newColors.css`, following the structure in `css/colors.css`, making sure that
  - primary tokens are inside a `[data-theme]` selector
  - semantic/component tokens in the _light_ theme are inside a `[data-theme="light"]` selector
  - semantic/component tokens in the _dark_ theme are inside a `[data-theme="dark"]` selector
- Investigate the changes in the tokens
  - you can do this by running `npm run colordiff css/colors.css css/newColors.css`. This will generated two files called `colorsAdded.txt` and `colorsRemoved.txt`
  - you can also make use of `git diff` if you prefer
- Make necessary changes in component CSS files to accommodate the new color tokens
  - with the help of the design team and the Figma designs, figure out why the changes were made
  - make sure that the removed color tokens are not being used anywhere in the component library. If you find any usages, figure out which of the new color tokens should be used as a replacement
  - of course, after you are done, rename `css/newColors.css` to be the new `css/colors.css`
- consider issuing a new major version release of the component library (see the section on `semantic-release` below), since the removal of tokens is technically a breaking change. In this case, you should add information to the migration guide to explain how users should update to the new version.

## Commit Hooks

When commiting new code, you may notice some scripts running, and you may even get some errors. We use commit hooks to ensure that the code and commit messages meet certain standards. Note, you must have run `npm install` in the root of the repository for these to be activated.

### Automatic Code Linting

The project uses eslint for code linting. The code is automatically linted before commits. If there are unfixable errors, then the commit fails. To manually lint the code:

```
npm run lint
```

### Automatic Code Formatting

The project uses prettier for code formatting. The code is automatically formatted before commits. To manually format the code:

```
npm run prettier
```

### Automatic Commit Message Checking

The project enforces the Conventional Commit format for commit messages. More specifically, it enforces the [specification](https://github.com/conventional-changelog/commitlint/blob/master/%40commitlint/config-angular/README.md) provided by Angular. In particular, the allowed commit types are:

```
build, ci, docs, feat, fix, perf, refactor, revert, style, test
```

## Branching model

- Release versions are published from the `main` branch.
- `alpha` and `beta` are prerelease branches
  - `alpha` is not protected. If you need to release prereleases during development, use this branch (reset to `main` or `beta` at wish).
  - `beta` is protected and the primary target for pull requests with new features and fixes. Please merge your work here first. Afterwards, a release can be done by merging `beta` into `main`.
- Older versions can be maintained in maintenance branches like `2.x`. Do fixes or backports via pull requests into these branches.

## Semantic Release

We use `semantic-release` to manage our automatic releases. This runs during every pipeline run, and is configured in `.releaserc.cjs`. [Here](https://semantic-release.gitbook.io/semantic-release) you can see the documentation.

To test the semantic release process locally, run

```bash
npx semantic-release --no-ci
```

## Sbom

- [Confluence page](https://krones-digital.atlassian.net/wiki/spaces/DEV/pages/493027417/08.4+SBOM) which describes our `sbom` tooling
- [Documenation](https://docs.npmjs.com/cli/v10/commands/npm-sbom) for `npm sbom`
