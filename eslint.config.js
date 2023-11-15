import eslint from '@eslint/js'
import * as espree from 'espree'
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin'
import typescriptEslintParser from '@typescript-eslint/parser'
import typescriptStylisticPlugin from '@stylistic/eslint-plugin-ts'
import javascriptStylisticPlugin from '@stylistic/eslint-plugin-js'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import pluginImport from 'eslint-plugin-import'
import pluginImportConfig from 'eslint-plugin-import/config/recommended.js'
import globals from 'globals'

import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const projectDirname = dirname(fileURLToPath(import.meta.url))

const allTsExtensionsArray = ['ts', 'mts', 'cts', 'tsx', 'mtsx']
const allJsExtensionsArray = ['js', 'mjs', 'cjs', 'jsx', 'mjsx']
const allTsExtensions = allTsExtensionsArray.join(',')
const allJsExtensions = allJsExtensionsArray.join(',')
const allExtensions = [...allTsExtensionsArray, ...allJsExtensionsArray].join(',')

const importRules = {
  'import/no-unresolved': 'error', // eslint-import-resolver-typescript
}

const baseRules = {
  'prettier/prettier': 'warn', // eslint-plugin-prettier
}

const typescriptRules = {
  'max-len': [
    'warn',
    { code: 120, ignoreComments: true, ignoreTrailingComments: true, ignoreStrings: true, ignoreUrls: true },
  ],
  '@stylistic/ts/indent': ['error', 2, { SwitchCase: 1 }],
  '@stylistic/ts/semi': ['error', 'never'],
  '@stylistic/ts/quotes': ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
  '@stylistic/ts/object-curly-spacing': ['warn', 'always'],
}

const javascriptRules = {
  '@stylistic/js/max-len': [
    'warn',
    { code: 120, ignoreComments: true, ignoreTrailingComments: true, ignoreStrings: true, ignoreUrls: true },
  ],
  '@stylistic/js/indent': ['error', 2, { SwitchCase: 1 }],
  '@stylistic/js/semi': ['error', 'never'],
  '@stylistic/js/quotes': ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
  '@stylistic/js/object-curly-spacing': ['warn', 'always'],
}

const typescriptRulesDev = {
  '@typescript-eslint/no-explicit-any': 'warn', // default warn
  '@typescript-eslint/no-unused-vars': ['off'],
  '@typescript-eslint/prefer-nullish-coalescing': ['off'],
  '@typescript-eslint/no-inferrable-types': ['off'],
  '@typescript-eslint/dot-notation': ['off'],
  'sort-imports': ['error', { ignoreCase: true, ignoreDeclarationSort: true }],
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
      '@stylistic/ts': typescriptStylisticPlugin,
      'import': pluginImport,
      'prettier': prettierPlugin,
    },
    rules: {
      ...typescriptStylisticPlugin.configs['disable-legacy'].rules,
      ...prettierConfig.rules,
      ...pluginImportConfig.rules,
      ...typescriptEslintPlugin.configs['stylistic-type-checked'].rules,
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
      '@stylistic/js': javascriptStylisticPlugin,
      'import': pluginImport,
      'prettier': prettierPlugin,
    },
    rules: {
      ...javascriptStylisticPlugin.configs['disable-legacy'].rules,
      ...prettierConfig.rules,
      ...pluginImportConfig.rules,
      ...typescriptEslintPlugin.configs['stylistic'].rules,
      ...typescriptEslintPlugin.configs.recommended.rules,
      ...typescriptEslintPlugin.configs['recommended-type-checked'].rules,
      //
      // ...typescriptEslintPlugin.configs.strict.rules,
      // ...typescriptEslintPlugin.configs['strict-type-checked'].rules,
      //
      ...importRules,
      ...baseRules,
      ...javascriptRules,
    },
  },
  {
    /* config files: typescript */
    files: [`**/*.config.{${allTsExtensions}}`],
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      '@stylistic/ts': typescriptStylisticPlugin,
      'import': pluginImport,
      'prettier': prettierPlugin,
    },
    rules: {
      ...typescriptStylisticPlugin.configs['disable-legacy'].rules,
      ...prettierConfig.rules,
      ...typescriptEslintPlugin.configs['stylistic-type-checked'].rules,
      ...baseRules,
      ...typescriptRules,
      '@typescript-eslint/prefer-nullish-coalescing': ['off'],
    },
  },
  {
    /* config files: javascript */
    files: [`**/*.config.{${allJsExtensions}}`],
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      '@stylistic/js': javascriptStylisticPlugin,
      'import': pluginImport,
      'prettier': prettierPlugin,
    },
    rules: {
      ...javascriptStylisticPlugin.configs['disable-legacy'].rules,
      ...prettierConfig.rules,
      ...typescriptEslintPlugin.configs['stylistic'].rules,
      ...typescriptEslintPlugin.configs.recommended.rules,
      ...typescriptEslintPlugin.configs['recommended-type-checked'].rules,
      ...typescriptEslintPlugin.configs.strict.rules,
      ...baseRules,
      ...javascriptRules,
      '@typescript-eslint/no-unsafe-call': ['off'],
      '@typescript-eslint/no-unsafe-member-access': ['off'],
      '@typescript-eslint/no-unsafe-assignment': ['off'],
      '@typescript-eslint/no-unused-vars': ['warn'],
    },
  },
  {
    /* webppl specific parser */
    files: ['**/*.wppl'],
    languageOptions: {
      sourceType: 'module',
      parser: espree,
      parserOptions: {
        ecmaVersion: 2017, // 2017 sets the ecmaVersion parser option to 8
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2017,
        globalStore: true,
        _: 'readonly',
        argv: true,
        json: 'readonly',
        Float64Array: true,
        viz: 'readonly',
        display: 'readonly',
        sum: 'readonly',
        map: 'readonly',
        map2: 'readonly',
        repeat: 'readonly',
        mapIndexed: 'readonly',
        expectation: 'readonly',
        uniformDraw: 'readonly',
        marginalize: 'readonly',
        factor: 'readonly',
        observe: 'readonly',
        sample: 'readonly',
        flip: 'readonly',
        Infer: 'readonly',
        Categorical: 'readonly',
        Gaussian: 'readonly',
        Beta: 'readonly',
        Gamma: 'readonly',
        Bernoulli: 'readonly',
        Discrete: 'readonly',
      },
    },
    plugins: {
      '@stylistic/js': javascriptStylisticPlugin,
    },
    rules: {
      ...javascriptStylisticPlugin.configs['disable-legacy'].rules,
      ...eslint.configs.recommended.rules,
      '@stylistic/js/indent': [
        'error',
        2,
        {
          SwitchCase: 1,
          VariableDeclarator: 2,
          ArrayExpression: 'first',
        },
      ],
      '@stylistic/js/semi': ['error', 'never'],
      '@stylistic/js/quotes': ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
      '@stylistic/js/space-before-function-paren': [
        'error',
        {
          anonymous: 'never',
          named: 'never',
          asyncArrow: 'always',
        },
      ],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/no-console': ['off'],
      'no-constant-condition': [
        'error',
        {
          checkLoops: false,
        },
      ],
      'no-empty': [
        'error',
        {
          allowEmptyCatch: true,
        },
      ],
      'no-extra-bind': ['error'],
      'no-redeclare': ['off'],
      'no-unused-vars': ['warn'],
      'no-warning-comments': ['error'],
    },
  },
  {
    // The new config system no longer supports .eslintignore files
    // https://eslint.org/blog/2022/10/eslint-v8.25.0-released/#highlights
    ignores: ['build/*'],
  },
]

export default config
