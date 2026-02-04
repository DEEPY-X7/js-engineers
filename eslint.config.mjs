export default {
  root: true, // Mark this as the root configuration to stop ESLint from searching for other configurations up the directory tree
  env: {
    browser: true, // For browser environments
    node: true, // For Node.js environments
    es2021: true, // Enables ECMAScript 2021 features
  },
  extends: [
    'eslint:recommended', // Uses the recommended ESLint rules
    'plugin:react/recommended', // React specific linting rules
    'plugin:react-hooks/recommended', // React Hooks linting rules
    'plugin:jsx-a11y/recommended', // Accessibility linting for JSX
    'plugin:prettier/recommended', // Automatically formats code according to Prettier rules
  ],
  parserOptions: {
    ecmaVersion: 12, // Allows the parsing of ECMAScript 2021 features
    sourceType: 'module', // Support for ECMAScript modules (import/export)
  },
  plugins: [
    'react', // React linting plugin
    'react-hooks', // React hooks linting plugin
    'jsx-a11y', // Accessibility linting plugin for JSX
    'prettier', // Prettier plugin for automatic code formatting
  ],
  rules: {
    'prettier/prettier': 'error', // Ensures code is automatically formatted according to Prettier rules
    'react/prop-types': 'off', // Disable prop-types rule if you're using TypeScript or other validation methods
    'react/jsx-uses-react': 'off', // JSX automatically imports React (for React 17+)
    'react/react-in-jsx-scope': 'off', // React 17+ no longer requires React to be in scope
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warn about unused variables, but ignore parameters starting with "_"
    'no-console': 'warn', // Warn when console statements are used
    'eqeqeq': ['error', 'always'], // Enforce strict equality (===, !==) over loose equality (==, !=)
    'no-trailing-spaces': 'error', // Enforce no trailing spaces
    'semi': ['error', 'always'], // Enforce semicolons at the end of statements
    'quotes': ['error', 'single'], // Enforce the use of single quotes for strings
    'indent': ['error', 2], // Enforce 2-space indentation
    'react/jsx-indent': ['error', 2], // Enforce 2-space indentation for JSX
  },
  settings: {
    react: {
      version: 'detect', // Automatically detects the React version
    },
  },
};