import antfu from '@antfu/eslint-config'

export default antfu(
  {
    rules: {
      'eqeqeq': ['error', 'always'],
      'quote-props': [2, 'consistent'],
      'curly': [2, 'all'],
      'arrow-parens': [1, 'as-needed'],
      'prefer-regex-literals': 0,
    },
  },
)
