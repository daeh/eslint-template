import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

import eslint from '@eslint/js'
import defaultStylisticPlugin from '@stylistic/eslint-plugin'
import javascriptStylisticPlugin from '@stylistic/eslint-plugin-js'
import typescriptStylisticPlugin from '@stylistic/eslint-plugin-ts'
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin'
import typescriptEslintParser from '@typescript-eslint/parser'
import prettierConfig from 'eslint-config-prettier'
import pluginImport from 'eslint-plugin-import'
import pluginImportConfig from 'eslint-plugin-import/config/recommended.js'
import jsDocPlugin from 'eslint-plugin-jsdoc'
import prettierPlugin from 'eslint-plugin-prettier'
import * as espree from 'espree'
import globals from 'globals'

import WebPPLGlobals from './globals/globalsWebPPL.mjs'
import WebPPLGlobalsdists from './globals/globalsWebPPLdists.mjs'
import WebPPLGlobalsenv from './globals/globalsWebPPLenv.mjs'
import WebPPLGlobalsJs from './globals/globalsWebPPLJs.mjs'

const projectDirname = dirname(fileURLToPath(import.meta.url))

const allTsExtensionsArray = ['ts', 'mts', 'cts', 'tsx', 'mtsx']
const allJsExtensionsArray = ['js', 'mjs', 'cjs', 'jsx', 'mjsx']
const allTsExtensions = allTsExtensionsArray.join(',')
const allJsExtensions = allJsExtensionsArray.join(',')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const allExtensions = [...allTsExtensionsArray, ...allJsExtensionsArray].join(',')

const importRules = {
  'import/no-unresolved': 'error',
  'import/order': [
    'error',
    {
      'groups': [
        'builtin', // Built-in imports (come from NodeJS native) go first
        'external', // <- External imports
        'internal', // <- Absolute imports
        ['sibling', 'parent'], // <- Relative imports, the sibling and parent types they can be mingled together
        'index', // <- index imports
        'unknown', // <- unknown
      ],
      'newlines-between': 'always',
      'alphabetize': {
        /* sort in ascending order. Options: ["ignore", "asc", "desc"] */
        order: 'asc',
        /* ignore case. Options: [true, false] */
        caseInsensitive: true,
      },
    },
  ],
}

const baseRules = {
  'prettier/prettier': 'warn',
  '@stylistic/max-len': [
    'warn',
    { code: 120, ignoreComments: true, ignoreTrailingComments: true, ignoreStrings: true, ignoreUrls: true },
  ],
  '@stylistic/indent': ['error', 2, { SwitchCase: 1 }],
  '@stylistic/semi': ['error', 'never'],
  '@stylistic/quotes': ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
  '@stylistic/object-curly-spacing': ['warn', 'always'],
  '@stylistic/array-element-newline': ['error', 'consistent'],
}

const typescriptRules = {}

const javascriptRules = {}

const typescriptRulesDev = {
  '@typescript-eslint/no-explicit-any': ['warn'],
  '@typescript-eslint/no-unused-vars': ['warn'],
  '@typescript-eslint/prefer-nullish-coalescing': ['off'],
  '@typescript-eslint/no-inferrable-types': ['off'],
  '@typescript-eslint/dot-notation': ['off'],
}

const javascriptRulesDev = {
  '@typescript-eslint/no-unused-vars': ['warn'],
}

const config = [
  {
    /* setup parser for all files */
    files: [`**/*.{${allTsExtensions},${allJsExtensions}}`],
    languageOptions: {
      sourceType: 'module',
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: 'latest', // 2024 sets the ecmaVersion parser option to 15
        tsconfigRootDir: resolve(projectDirname),
        project: './tsconfig.json',
      },
    },
  },
  {
    /* all typescript files, except config files */
    files: [`**/*.{${allTsExtensions}}`],
    ignores: [`**/*.config.{${allTsExtensions}}`],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      '@stylistic': defaultStylisticPlugin,
      'import': pluginImport,
      'prettier': prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      ...pluginImportConfig.rules,
      ...typescriptEslintPlugin.configs['stylistic-type-checked'].rules,
      ...typescriptStylisticPlugin.configs['disable-legacy'].rules,
      ...typescriptEslintPlugin.configs.recommended.rules,
      ...typescriptEslintPlugin.configs['recommended-type-checked'].rules,
      //
      // ...typescriptEslintPlugin.configs.strict.rules,
      // ...typescriptEslintPlugin.configs['strict-type-checked'].rules,
      //
      ...importRules,
      ...baseRules,
      ...typescriptRules,
      ...typescriptRulesDev,
    },
  },
  {
    /* all javascript files, except config */
    files: [`**/*.{${allJsExtensions}}`],
    ignores: [`**/*.config.{${allJsExtensions}}`],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      '@stylistic': defaultStylisticPlugin,
      'import': pluginImport,
      'prettier': prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      ...pluginImportConfig.rules,
      ...typescriptEslintPlugin.configs['stylistic'].rules,
      ...javascriptStylisticPlugin.configs['disable-legacy'].rules,
      ...typescriptEslintPlugin.configs.recommended.rules,
      ...typescriptEslintPlugin.configs['recommended-type-checked'].rules,
      //
      // ...typescriptEslintPlugin.configs.strict.rules,
      // ...typescriptEslintPlugin.configs['strict-type-checked'].rules,
      //
      ...importRules,
      ...baseRules,
      ...javascriptRules,
      ...javascriptRulesDev,
    },
  },
  {
    /* config files: typescript */
    files: [`**/*.config.{${allTsExtensions}}`],
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      '@stylistic': defaultStylisticPlugin,
      'import': pluginImport,
      'prettier': prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      ...typescriptEslintPlugin.configs['stylistic-type-checked'].rules,
      ...typescriptStylisticPlugin.configs['disable-legacy'].rules,
      ...importRules,
      ...baseRules,
      ...typescriptRules,
      '@typescript-eslint/prefer-nullish-coalescing': ['off'],
    },
  },
  {
    /* config files: javascript */
    files: [`**/*.config.{${allJsExtensions}}`],
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      '@stylistic': defaultStylisticPlugin,
      'import': pluginImport,
      'prettier': prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      ...typescriptEslintPlugin.configs['stylistic'].rules,
      ...javascriptStylisticPlugin.configs['disable-legacy'].rules,
      ...typescriptEslintPlugin.configs.recommended.rules,
      ...typescriptEslintPlugin.configs['recommended-type-checked'].rules,
      ...typescriptEslintPlugin.configs.strict.rules,
      ...importRules,
      ...baseRules,
      ...javascriptRules,
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/no-unsafe-call': ['warn'],
      '@typescript-eslint/no-unsafe-member-access': ['off'],
      '@typescript-eslint/no-unsafe-assignment': ['off'],
    },
  },
  {
    /* webppl specific parser */
    files: ['**/*.wppl'],
    languageOptions: {
      sourceType: 'script',
      parser: espree,
      parserOptions: {
        ecmaVersion: 2017, // 2017 sets the ecmaVersion parser option to 8
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2017,
        ...WebPPLGlobals,
        ...WebPPLGlobalsenv,
        ...WebPPLGlobalsdists,
        ...WebPPLGlobalsJs,
        _: 'readonly',
        json: 'readonly',
        globalStore: true,
        argv: true,
        viz: 'readonly',
      },
    },
    settings: {
      jsdoc: {
        mode: 'typescript',
      },
    },
    plugins: {
      'jsdoc': jsDocPlugin,
      '@stylistic': defaultStylisticPlugin,
    },
    rules: {
      'jsdoc/check-tag-names': 'error',
      'jsdoc/check-types': 'error',
      ...javascriptStylisticPlugin.configs['disable-legacy'].rules,
      ...eslint.configs.recommended.rules,
      '@stylistic/indent': [
        'error',
        2,
        {
          SwitchCase: 1,
          VariableDeclarator: 2,
          ArrayExpression: 'first',
        },
      ],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/quotes': ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
      '@stylistic/space-before-function-paren': [
        'error',
        {
          anonymous: 'never',
          named: 'never',
          asyncArrow: 'always',
        },
      ],
      '@stylistic/linebreak-style': ['error', 'unix'],
      '@stylistic/no-console': ['off'],
      'no-unused-vars': ['warn'],
      // 'no-constant-condition': [
      //   'error',
      //   {
      //     checkLoops: false,
      //   },
      // ],
      // 'no-empty': [
      //   'error',
      //   {
      //     allowEmptyCatch: true,
      //   },
      // ],
      // 'no-extra-bind': ['error'],
      // 'no-redeclare': ['off'],
      // 'no-warning-comments': ['error'],
    },
  },
  {
    ignores: ['dist', 'build'],
  },
]

export default config
