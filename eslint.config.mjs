import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat }                         from '@eslint/eslintrc';
import js                                     from '@eslint/js';
import stylistic                              from '@stylistic/eslint-plugin';
import typescriptEslint                       from '@typescript-eslint/eslint-plugin';
import tsParser                               from '@typescript-eslint/parser';
import _import                                from 'eslint-plugin-import';
import react                                  from 'eslint-plugin-react';
import reactHooks                             from 'eslint-plugin-react-hooks';
import unusedImports                          from 'eslint-plugin-unused-imports';
import { defineConfig, globalIgnores }        from 'eslint/config';
import globals                                from 'globals';
import path                                   from 'node:path';
import { fileURLToPath }                      from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const GLOBALS_BROWSER_FIX = Object.assign({}, globals.browser, {
  AudioWorkletGlobalScope: globals.browser['AudioWorkletGlobalScope ']
});

delete GLOBALS_BROWSER_FIX['AudioWorkletGlobalScope '];

export default defineConfig([
  globalIgnores([
    'build/**/*',
    '**/.react-router/**/*',
    '**/*.mjs',
  ]), {
    extends: fixupConfigRules(compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
    )),

    plugins: {
      react: fixupPluginRules(react),
      'react-hooks': fixupPluginRules(reactHooks),
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      import: fixupPluginRules(_import),
      'unused-imports': unusedImports,
      '@stylistic': stylistic,
    },

    languageOptions: {
      globals: {
        ...GLOBALS_BROWSER_FIX,
      },
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    settings: {
      react: {
        version: 'detect',
      },

      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },

    rules: {
      'react/react-in-jsx-scope': 'off',

      'import/order': [
        'warn', {
          groups: [['builtin', 'external', 'internal'], ['sibling', 'parent', 'index']],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'distinctGroup': false,
          'pathGroupsExcludedImportTypes': ['builtin'],
        },
      ],

      'max-len': [
        'error', {
          code: 130,
          ignoreUrls: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
          ignoreComments: true,
        },
      ],

      'unused-imports/no-unused-imports': 'error',
      '@stylistic/indent': ['error', 2, {
        'SwitchCase': 1
      }],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/brace-style': ['error', '1tbs'],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/no-mixed-spaces-and-tabs': 'error',
      '@stylistic/comma-dangle': ['error', 'never'],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/function-paren-newline': ['error', 'multiline'],
      '@typescript-eslint/no-unused-vars': 'warn',
      '@stylistic/jsx-indent': ['error', 2],
      '@stylistic/jsx-closing-bracket-location': ['error', 'line-aligned'],
      '@stylistic/jsx-curly-brace-presence': ['error', 'never'],
      '@stylistic/jsx-one-expression-per-line': [
        'error', {
          'allow': 'single-child',
        },
      ],
      '@stylistic/jsx-wrap-multilines': [
        'error', {
          'declaration': 'parens',
          'assignment': 'parens',
          'return': 'parens',
        },
      ],
      '@stylistic/jsx-closing-tag-location': ['error', 'tag-aligned'],
      '@stylistic/jsx-equals-spacing': ['error', 'never'],
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
      'react/prop-types': 'off',
      '@stylistic/array-bracket-newline': [
        'error', {
          multiline: true,
          minItems: 999,
        },
      ],
    },
  },
]);
