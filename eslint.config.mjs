/* eslint.config.js */
import withNuxt from './.nuxt/eslint.config.mjs';
import globals from 'globals';
// import vueI18nPlugin from '@intlify/eslint-plugin-vue-i18n';
import tseslint from 'typescript-eslint';
import vuePlugin from 'eslint-plugin-vue';
import jsPlugin from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default withNuxt([
  /* ------------------------------------------------------------------ */
  /* file globs                                                         */
  /* ------------------------------------------------------------------ */
  { files: ['**/*.{js,ts,vue}'] },

  /* ------------------------------------------------------------------ */
  /* base language options                                              */
  /* ------------------------------------------------------------------ */
  {
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        google: 'readonly',
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /* plugin / package‑level settings                                    */
  /* ------------------------------------------------------------------ */
  {
    settings: {
      'vue-i18n': {
        localeDir: {
          pattern: './locales/*.json',
          localeKey: 'file',
        },
        messageSyntaxVersion: '^9.0.0',
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /* ignore patterns                                                    */
  /* ------------------------------------------------------------------ */
  {
    ignores: [
      'node_modules',
      '.output',
      'dist',
      'public',
      '.nuxt',
      'pnpm-lock.yaml',
    ],
  },

  /* ------------------------------------------------------------------ */
  /* plugins                                                            */
  /* ------------------------------------------------------------------ */
  {
    plugins: {
      prettier: prettierPlugin,
    },
  },

  /* ------------------------------------------------------------------ */
  /* shared configs                                                     */
  /* ------------------------------------------------------------------ */
  prettierConfig,
  jsPlugin.configs.recommended,
  ...tseslint.configs.recommended,
  ...vuePlugin.configs['flat/essential'],
  // ...vueI18nPlugin.configs['flat/recommended'],

  /* ------------------------------------------------------------------ */
  /* custom rules                                                       */
  /* ------------------------------------------------------------------ */
  {
    rules: {
      /* prettier ------------------------------------------------------ */
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'all',
          printWidth: 80,
        },
      ],

      /* vue rules ----------------------------------------------------- */
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        { registeredComponentsOnly: false },
      ],
      'vue/block-lang': ['error', { script: { lang: 'ts' } }],
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-self-closing': 'off',
      'vue/require-v-for-key': 'off',

      /* typescript‑eslint -------------------------------------------- */
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',

      /* vue‑i18n ------------------------------------------------------ */
      // '@intlify/vue-i18n/no-raw-text': [
      //   'error',
      //   { ignoreText: ['|', 'fr-FR', 'en-US'] },
      // ],
      // '@intlify/vue-i18n/no-missing-keys-in-other-locales': [
      //   'error',
      //   { ignoreLocales: [] },
      // ],
      // Dynamic-keys friendly; enable if/when you can statically analyse keys
      // '@intlify/vue-i18n/no-unused-keys': [
      //   'error',
      //   {
      //     extensions: ['.js', '.ts', '.json', '.vue'],
      //     enableFix: false,
      //   },
      // ],

      /* misc ---------------------------------------------------------- */
      'no-irregular-whitespace': 'warn',
    },
  },

  /* ------------------------------------------------------------------ */
  /* JSON files                                                         */
  /* ------------------------------------------------------------------ */
  {
    files: ['**/*.json'],
    rules: {
      'no-irregular-whitespace': 'warn',
    },
  },
]);
