module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  ignorePatterns: [
    '.next/',
    'node_modules/',
    'build/',
    'dist/',
    '**/*.generated.ts',
    '**/*.generated.js'
  ],
  rules: {
    // More specific unused vars rule
    '@typescript-eslint/no-unused-vars': ['warn', {
      vars: 'all',
      varsIgnorePattern: '^_|unused_webpack_module',
      args: 'after-used',
      ignoreRestSiblings: true,
      argsIgnorePattern: '^_'
    }],
    // Explicitly allow optional chaining and nullish coalescing
    '@typescript-eslint/no-unnecessary-condition': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': 'off',
    'no-unused-expressions': 'off',
    'import/no-webpack-loader-syntax': 'off',
    
    // Specific type-related rules
    '@typescript-eslint/prefer-optional-chain': 'warn',
    '@typescript-eslint/strict-boolean-expressions': 'off'
  }
};
