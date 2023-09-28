import antfu from '@antfu/eslint-config'

export default antfu(
  {
    rules: {
      'eqeqeq': ['error', 'always'],
      'quote-props': [2, 'consistent'],
      'curly': [2, 'all'],
      'arrow-parens': [1, 'as-needed'],
      'prefer-regex-literals': 0,
      'comma-dangle': ['error', {
        'arrays': 'never',
        'objects': 'always-multiline',
        'imports': 'never',
        'exports': 'never',
        'functions': 'never',
      }],
    },
  }
)
