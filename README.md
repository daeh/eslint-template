# ESLint Template

- Uses the new [flat config system](https://eslint.org/docs/latest/use/configure/configuration-files-new) that is the default beginning in ESLint `v9.0.0`.
- Uses [ESLint Stylistic](https://eslint.style/) `@stylistic/eslint-plugin`

## VSCode Settings

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
