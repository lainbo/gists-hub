import antfu from '@antfu/eslint-config'

export default antfu(
  {
    rules: {
      'eqeqeq': ['error', 'always'],
      'quote-props': ['error', 'consistent-as-needed'],
      'curly': ['error', 'all'],
      'prefer-regex-literals': 0,
    },
  },
)
