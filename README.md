# ESLint Template

This is a future-looking configuration that implements the major developments from [ESLint](https://eslint.org).

### ESLint Config

Beginning in ESLint `v9.0.0`, the default will be the new [flat config system](https://eslint.org/docs/latest/use/configure/configuration-files-new). This will depreciate the `Common.js Module` config system (which uses `.eslintrc.js`), replacing it with the `ES Module` config system (which uses `eslint.config.js`).

### ESLint Stylistic

ESLint is [depreciating formatting rules](https://eslint.org/blog/2023/10/deprecating-formatting-rules/), passing over maintenance and development to the community-run plugin [ESLint Stylistic](https://eslint.style/).

## This Example Config

The main file in this repot is the flat ESLint config, [eslint.config.mjs](https://github.com/daeh/eslint-template/blob/main/eslint.config.mjs). This project is configured as a `ES Module`, so this file could be named `eslint.config.js`, but I have given it the `.mjs` extension to make this config work for `Common.js Module` development with minimal reconfiguration.

While ESLint has no issue using the `.mjs` file, IDEs like_VS Code and_IntelliJ IDEA currently require the `.js` extension. A simple workaround is to make an alias `eslint.config.js` that points to `eslint.config.mjs`. This is done automatically during install by the `package.json` file.

This project uses **Typescript** and **Prettier**, and includes the `tsconfig.json` and `.prettierrc.json` files. The ESLint config integrates these configurations.

### WebPPL

I have included an example of how to use ESLint to format [WebPPL](https://webppl.readthedocs.io/en/master/) code. All of the WebPPL-specific configuration can be removed if not desired without affecting the linting and formatting of Javascript and Typescript.

## Installation

Install the dependancies using [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/), e.g.

```shell
### Clone git repo to the current working directory
git clone --branch main https://github.com/daeh/eslint-template.git eslint-template

### Enter the new directory
cd eslint-template

### Install
npm install
```

In addition to installing the dependancies, this will create the `eslint.config.js` link to `eslint.config.mjs`.

### VS Code Settings

For VS Code to respect the configuration, you need to specify the formatter for the relevant files. This is done for you in `.vscode/settings.json`, which is copied bellow. This tells VS Code to use the ESLint flat config system, to use the [Prettier - Code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension to format Javascript, HTML, JSON, and CSS files, and let ESLint format WebPPL files. This obviously requires the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions to be enabled for the workspace.

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.associations": {
    "*.wppl": "javascript"
  },
  "eslint.experimental.useFlatConfig": true,
  "[javascript][javascriptreact][typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
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
  }
}
```

### IntelliJ IDEA Settings

This should work out of the box for IntelliJ (once the `eslint.config.js` file has been created). Make sure you have enabled ESLint and Prettier for the project:

- `Settings... > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint`
  - Enable `Automatic ESLint configuration`
  - Enable `Run eslint --fix on save`
- `Settings... > Languages & Frameworks > JavaScript > Prettier`
  - Enable `Automatic Prettier configuration`
  - Enable `Run on save`

If you change the project from an `ES Module` to a `Common.js Module`, or if ESLint isn't working, try [this fix from Ditlef Diseth](https://youtrack.jetbrains.com/issue/WEB-61117/ESLint-flat-config-doesnt-work-with-non-default-custom-path-to-the-config-file#focus=Comments-27-8196242.0-0).

## Usage

Once your IDE settings are configured, you should see unused variable warnings in the three test files provided in `src/`.

You can format, lint and build the project from the command line by calling the commands in `package.json`,

```json
{
  "scripts": {
    "build": "tsc --project tsconfig.dev.json --noEmit",
    "lint": "ESLINT_USE_FLAT_CONFIG=true prettier --write . && eslint --config eslint.config.mjs --fix ."
  }
}
```

by running `npm run lint`, `npm run build`, etc.

## Author

[![Personal Website](https://img.shields.io/badge/personal%20website-daeh.info-orange?style=for-the-badge)](https://daeh.info) [![BlueSky](https://img.shields.io/badge/bsky-@dae.bsky.social-blue?style=for-the-badge)](https://bsky.app/profile/dae.bsky.social) [![Twitter](https://img.shields.io/badge/twitter-@DaeHoulihan-white?style=for-the-badge&logo=twitter)](https://twitter.com/DaeHoulihan)
