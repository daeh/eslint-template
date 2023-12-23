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
import pluginJSDoc from 'eslint-plugin-jsdoc'
import prettierPlugin from 'eslint-plugin-prettier'
import * as espree from 'espree'
import globals from 'globals'

import WebPPLGlobals from './globals/globalsWebPPL.mjs'
import WebPPLdistGlobals from './globals/globalsWebPPLdists.mjs'
import WebPPLenvGlobals from './globals/globalsWebPPLenv.mjs'
import WebPPLjsGlobals from './globals/globalsWebPPLJs.mjs'

const projectDirname = dirname(fileURLToPath(import.meta.url))

const env = (() => {
  if (typeof process.env.NODE_ENV === 'undefined') return 'default'
  if (process.env.NODE_ENV === 'development') return 'development'
  if (process.env.NODE_ENV === 'production') return 'production'
  return 'error'
})()

const allTsExtensionsArray = ['ts', 'mts', 'cts', 'tsx', 'mtsx']
const allJsExtensionsArray = ['js', 'mjs', 'cjs', 'jsx', 'mjsx']
const allTsExtensions = allTsExtensionsArray.join(',')
const allJsExtensions = allJsExtensionsArray.join(',')
const allExtensions = [...allTsExtensionsArray, ...allJsExtensionsArray].join(',')

const importRules = {
  'import/no-unresolved': 'error',
  'sort-imports': [
    'error',
    {
      allowSeparatedGroups: true,
      ignoreCase: true,
      ignoreDeclarationSort: true,
      ignoreMemberSort: false,
      memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
    },
  ],
  'import/order': [
    'error',
    {
      'groups': [
        'builtin', // Built-in imports (come from NodeJS native) go first
        'external', // External imports
        'internal', // Absolute imports
        'parent', // Relative imports
        'sibling', // Relative imports
        // ['sibling', 'parent'], // Relative imports, the sibling and parent types they can be mingled together
        'index', // index imports
        'type', // type imports
        'unknown', // unknown
      ],
      'newlines-between': 'always',
      'alphabetize': {
        order: 'asc',
        caseInsensitive: true, // ignore case
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

const typescriptRules = {
  ...prettierConfig.rules,
  ...pluginImportConfig.rules,
  ...typescriptEslintPlugin.configs.recommended.rules,
  ...typescriptEslintPlugin.configs['recommended-type-checked'].rules,
  ...typescriptEslintPlugin.configs.strict.rules,
  ...typescriptEslintPlugin.configs['strict-type-checked'].rules,
  ...typescriptEslintPlugin.configs['stylistic-type-checked'].rules,
  ...typescriptStylisticPlugin.configs['disable-legacy'].rules,
  ...importRules,
  ...baseRules,
}

const javascriptRules = {
  ...prettierConfig.rules,
  ...pluginImportConfig.rules,
  ...typescriptEslintPlugin.configs.recommended.rules,
  ...typescriptEslintPlugin.configs.strict.rules,
  ...typescriptEslintPlugin.configs['stylistic'].rules,
  ...javascriptStylisticPlugin.configs['disable-legacy'].rules,
  ...importRules,
  ...baseRules,
}

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
    files: [`**/*.{${allExtensions}}`],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: 'latest', // 2024 sets the ecmaVersion parser option to 15
        tsconfigRootDir: resolve(projectDirname),
        project: env === 'production' ? './tsconfig.prod.json' : './tsconfig.json',
        sourceType: 'module',
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
      ...javascriptRules,
      ...javascriptRulesDev,
    },
  },
  {
    /* config files: typescript */
    files: [`**/*.config.{${allTsExtensions}}`],
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      '@stylistic': defaultStylisticPlugin,
      'import': pluginImport,
      'prettier': prettierPlugin,
    },
    rules: {
      ...typescriptRules,
      // '@typescript-eslint/prefer-nullish-coalescing': ['off'],
    },
  },
  {
    /* config files: javascript */
    files: [`**/*.config.{${allJsExtensions}}`],
    settings: {
      'import/parsers': {
        espree: ['.js', '.mjs', '.cjs', '.jsx', '.mjsx'],
      },
      'import/resolver': {
        typescript: {},
        // node: {},
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      '@stylistic': defaultStylisticPlugin,
      'import': pluginImport,
      'prettier': prettierPlugin,
    },
    rules: {
      ...javascriptRules,
      '@typescript-eslint/no-unsafe-member-access': ['off'],
      '@typescript-eslint/no-unsafe-assignment': ['off'],
    },
  },
  {
    /* WebPPL espree parser */
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
        ...WebPPLenvGlobals,
        ...WebPPLdistGlobals,
        ...WebPPLjsGlobals,
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
      'jsdoc': pluginJSDoc,
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
    ignores: ['dist', 'build', '**/*_lintignore*', '**/*-buildignore*', '**/*_buildignore*'],
  },
]

export default config
