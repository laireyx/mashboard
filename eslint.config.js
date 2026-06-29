import js from '@eslint/js';
import { flatConfigs as importXConfigs } from 'eslint-plugin-import-x';
import reactHooks from 'eslint-plugin-react-hooks';
import { reactRefresh } from 'eslint-plugin-react-refresh';
import reactX from 'eslint-plugin-react-x';
import globals from 'globals';
import {
  config as tseslintConfig,
  configs as tseslintConfigs,
} from 'typescript-eslint';

export default tseslintConfig(
  {
    ignores: ['dist', 'out', 'release', 'node_modules', '.pnpm-store'],
  },
  js.configs.recommended,
  ...tseslintConfigs.recommended,
  importXConfigs.recommended,
  importXConfigs.typescript,
  importXConfigs.react,
  importXConfigs.electron,
  reactX.configs['recommended-typescript'],
  {
    files: ['workers/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.serviceworker,
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh.plugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
);
