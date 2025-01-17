# ESLint Template

This is a future-looking configuration that implements the major developments from [ESLint](https://eslint.org).

### ESLint Flat Config System

Beginning in ESLint `v9.0.0`, the default will be the new [flat config system](https://eslint.org/docs/latest/use/configure/configuration-files-new). This will deprecating the `Common.js Module` config system (which uses `.eslintrc.js`), replacing it with the `ES Module` config system (which uses `eslint.config.js`).

### ESLint Stylistic

ESLint is [deprecating formatting rules](https://eslint.org/blog/2023/10/deprecating-formatting-rules/), passing over maintenance and development to the community-run plugin [ESLint Stylistic](https://eslint.style/).

## This Example Config

The main file in this repo is the flat ESLint config, [`eslint.config.mjs`](eslint.config.mjs).

This project is configured as an `ES Module`, so this config file could be named `eslint.config.js`, but I have given it the `.mjs` extension to make this config work for `Common.js Module` development with minimal reconfiguration.

While ESLint has no issue using the `.mjs` config file, at present, IDEs like VS Code and IntelliJ IDEA require the `.js` extension. A simple workaround is to make an alias `eslint.config.js` that points to `eslint.config.mjs`. This is done automatically during install by the `package.json` file.

This project uses **TypeScript** and **Prettier**, which are configured in `tsconfig.json` and `prettier.config.mjs`. The ESLint config integrates these configurations.

### WebPPL

I have included an example of how to use ESLint to format [WebPPL](https://webppl.readthedocs.io/en/master/) code. All of the WebPPL-specific configuration can be removed if not desired without affecting the linting and formatting of JavaScript and TypeScript.

## Installation

- Fork this repo: `Use this template` > `Create a new repository`
- Git clone the forked repo
- Enter the repo folder

- Install the dependencies using [Yarn](https://yarnpkg.com/), e.g.

```shell
### Clone your forked repo to the current working directory
### Replace `daeh/eslint-template` with your username and repo name
git clone --branch main https://github.com/daeh/eslint-template.git eslint-template

### Enter the new directory
cd eslint-template || exit

### Install Node packages
yarn install
```

### VS Code Settings

For [VS Code](https://code.visualstudio.com/) to respect the configuration, you need to specify the formatter for the relevant files. This is done for you in [`VSCodeProject.code-workspace`](VSCodeProject.code-workspace) and in [`.vscode/settings.json`](.vscode/settings.json) (these are redundant, you only need one). This configures the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension to use the flat config system, makes VS Code use the [Prettier - Code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions for formatting Javascript, HTML, JSON, and CSS files, and lets ESLint format WebPPL files. This obviously requires the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions to be enabled for the workspace. Activate the `VSCodeProject.code-workspace` via `File > Open Workspace from File...` (or by double clicking it), activate `.vscode` via `File > Open Folder...` in VS Code.

The relevant settings are:

```json
{
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit"
    },
    "files.associations": {
      "*.wppl": "javascript"
    },
    "[javascript][javascriptreact][typescript]": {
      "editor.defaultFormatter": "dbaeumer.vscode-eslint"
    },
    "[wppl]": {
      "editor.defaultFormatter": "dbaeumer.vscode-eslint"
    },
    "[html]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[json][jsonc]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[css][scss][less]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "eslint.useFlatConfig": true,
    "typescript.enablePromptUseWorkspaceTsdk": true,
}
```

### IntelliJ IDEA Settings

For [IntelliJ IDEA](https://www.jetbrains.com/idea/) / [WebStorm](https://www.jetbrains.com/webstorm/) to respect the configuration, you need to enable ESLint and Prettier for the relevant filetypes. There is an example config in `.idea`. To enable ESLing and Prettier manually:

- `Settings... > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint`
  - Enable `Automatic ESLint configuration`
  - Enable `Run eslint --fix on save`
  - Add the additional filetypes to the `Run for files` field:
    - `{**/*,*}.{ts,mts,cts,tsx,mtsx,js,mjs,cjs,jsx,mjsx,html,wppl}`
- `Settings... > Languages & Frameworks > JavaScript > Prettier`
  - Enable `Automatic Prettier configuration`
  - Enable `Run on save`
  - Add the additional filetypes to the `Run for files` field:
    - `{**/*,*}.{ts,mts,cts,tsx,mtsx,js,mjs,cjs,jsx,mjsx,json,html,css,scss,vue,astro}`

If you change the project from an `ES Module` to a `Common.js Module`, or if ESLint isn't working, try [this fix from Ditlef Diseth](https://youtrack.jetbrains.com/issue/WEB-61117/ESLint-flat-config-doesnt-work-with-non-default-custom-path-to-the-config-file#focus=Comments-27-8196242.0-0):

- `Settings... > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint`
  - Switch to `Manual ESLint configuration`
  - Add this string to the `Extra ESLint options` field:
    ```shell
    ESLINT_USE_FLAT_CONFIG=true yarn eslint --config eslint.config.mjs
    ```

## Usage

Once your IDE settings are configured, you should see unused variable warnings in the three test files provided in `src/`.

You can format, lint and build the project from the command line by calling the commands in `package.json`,

```json
{
  "scripts": {
    "lint": "export ESLINT_USE_FLAT_CONFIG=true && prettier --config prettier.config.mjs --write . && eslint --config eslint.config.mjs --fix . && tsc --project tsconfig.json --noEmit"
  }
}
```

by running `yarn lint`, etc.

## Author

[![Personal Website](https://img.shields.io/badge/personal%20website-daeh.info-orange?style=for-the-badge)](https://daeh.info) [![BlueSky](https://img.shields.io/badge/bsky-@dae.bsky.social-blue?style=for-the-badge)](https://bsky.app/profile/dae.bsky.social) [![Twitter](https://img.shields.io/badge/twitter-@DaeHoulihan-white?style=for-the-badge&logo=twitter)](https://twitter.com/DaeHoulihan)
