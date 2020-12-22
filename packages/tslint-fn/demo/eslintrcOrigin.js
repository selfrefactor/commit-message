const arrayType = {
  '@typescript-eslint/array-type': [1, {default: 'array'}],
}
const delimiter = {
  '@typescript-eslint/member-delimiter-style': [
    1,
    {
      multiline: {
        delimiter: 'semi',
      },
      singleline: {
        delimiter: 'none',
      },
    },
  ],
}
const spaceBeforeFunction = {
  'space-before-function-paren': 'off',
  '@typescript-eslint/space-before-function-paren': [1, 'never'],
}
const extraParan = {
  'no-extra-parens': 'off',
  '@typescript-eslint/no-extra-parens': [1],
}
const indent = {
  indent: 'off',
  '@typescript-eslint/indent': [1, 2],
}
const callSpacing = {
  'func-call-spacing': 'off',
  '@typescript-eslint/func-call-spacing': [1, 'never'],
}
const commaSpacing = {
  'comma-spacing': 'off',
  '@typescript-eslint/comma-spacing': [
    1,
    {
      before: false,
      after: true,
    },
  ],
}

const braceStyle = {
  'brace-style': 'off',
  '@typescript-eslint/brace-style': [1, '1tbs', {allowSingleLine: true}],
}
const nullishCoalescing = {
  '@typescript-eslint/prefer-nullish-coalescing': [
    1,
    {
      ignoreConditionalTests: true,
      ignoreMixedLogicalExpressions: true,
      forceSuggestionFixer: true,
    },
  ],
}

const useInfer = {
  '@typescript-eslint/no-inferrable-types': {
    "ignoreParameters": false,
    "ignoreProperties": false,
  }
}
const consistentTypeImports = {
  '@typescript-eslint/consistent-type-imports': {
    prefer: 'type-imports'
  }
}

const rules = {
  ...delimiter,
  ...useInfer,
  ...arrayType,
  ...braceStyle,
  ...callSpacing,
  ...commaSpacing,
  ...extraParan,
  ...indent,
  ...nullishCoalescing,
  ...spaceBeforeFunction,
  ...consistentTypeImports,
  "@typescript-eslint/consistent-indexed-object-style": ["error", "record"],
  '@typescript-eslint/consistent-type-definitions': [1, 'interface'],
  '@typescript-eslint/no-array-constructor': 1,
  '@typescript-eslint/no-empty-interface': 1,
  '@typescript-eslint/method-signature-style': [1, 'property'],
  '@typescript-eslint/no-explicit-any': 0,
  '@typescript-eslint/no-unnecessary-boolean-literal-compare': 1,
  '@typescript-eslint/no-unnecessary-condition': 1,
  '@typescript-eslint/no-unnecessary-type-constraint': 1,
  '@typescript-eslint/non-nullable-type-assertion-style': 1,
  '@typescript-eslint/no-unnecessary-type-arguments': 1,
  '@typescript-eslint/no-unnecessary-type-assertion': 1,
  '@typescript-eslint/prefer-function-type': 1,
  '@typescript-eslint/prefer-as-const': 1,
  '@typescript-eslint/promise-function-async': 1,
  '@typescript-eslint/prefer-ts-expect-error': 1,
  '@typescript-eslint/prefer-includes': 1,
  '@typescript-eslint/prefer-optional-chain': 1,
  '@typescript-eslint/type-annotation-spacing': 1,
}

exports.config = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules,
}
