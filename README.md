# ESLint Template

This is a future-looking configuration that implements the major developments from [ESLint](https://eslint.org).

### ESLint Config

Beginning in ESLint `v9.0.0`, the default will be the new [flat config system](https://eslint.org/docs/latest/use/configure/configuration-files-new). This will depreciate the `Common.js Module` config system `.eslintrc.js`, replacing it with the `ES Module` config system  `eslint.config.js`.

### ESLint Stylistic

ESLint is [depreciating formatting rules](https://eslint.org/blog/2023/10/deprecating-formatting-rules/), passing over maintenance and development to the community-run plugin [ESLint Stylistic](https://eslint.style/).

## This Example Config

The main file in this repot is the flat ESLint config, [eslint.config.mjs](https://github.com/daeh/eslint-template/blob/main/eslint.config.mjs). This project is configured as a `ES Module`, so this file could be named `eslint.config.js`, but I have given it the `.mjs` extension to make this config work for `Common.js Module` development with minimal reconfiguration. 

While `ESLint` has no issue using the `.mjs` file, IDEs like VS Code and IntelliJ currently require the `.js` extension. A simple workaround is to make an alias `eslint.config.js` that points to `eslint.config.mjs`. This is done automatically during install by the `package.json` file.

This project uses **Typescript** and **Prettier**, and includes the `tsconfig.json` and `.prettierrc.json` files. The ESLint config integrates these configurations.

### WebPPL

I have included an example of how to use ESLint to format [WebPPL](https://webppl.readthedocs.io/en/master/) code. All of the WebPPL-specific configuration can be removed if not desired without affecting the linting and formatting of Javascript and Typescript.

## Installation

Install the dependancies using NPM or Yarn, e.g.

```shell
### Clone git repo to the current working directory
git clone --branch main https://github.com/daeh/eslint-template.git eslint-template

### Enter the new directory
cd eslint-template

### Install
npm install
```

In addition to installing the dependancies, this will create the `eslint.config.js` link to `eslint.config.mjs`.

## VS Code Settings

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

## Author

[![Personal Website](https://img.shields.io/badge/personal%20website-daeh.info-orange?style=for-the-badge)](https://daeh.info) [![BlueSky](https://img.shields.io/badge/bsky-@dae.bsky.social-blue?style=for-the-badge)](https://bsky.app/profile/dae.bsky.social) [![Twitter](https://img.shields.io/badge/twitter-@DaeHoulihan-blue?style=for-the-badge&logo=twitter)](https://twitter.com/DaeHoulihan)
