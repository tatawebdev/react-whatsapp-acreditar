import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      // Adiciona o suporte ao ambiente Node.js para o ESLint
      globals: {
        ...globals.browser, // Mantém as variáveis globais do navegador
        ...globals.node,    // Adiciona as variáveis globais do Node.js
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module', // Isso permite o uso de import/export
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Adicionando a configuração para ignorar o import React
      'no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^React$', // Ignora a variável React importada
        },
      ],
    },
  },
]