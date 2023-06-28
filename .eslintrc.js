module.exports = {
  root: true,
  extends: ['@antfu/eslint-config-basic'],
  rules: {
    'eqeqeq': ['error', 'always'], // 强制在任何情况下都使用 === 和 !==
    // 注释文字前面至少要有一个空格
    'spaced-comment': [
      1,
      'always',
      {
        line: { markers: ['/'], exceptions: ['-', '+'] },
        block: { markers: ['!'], exceptions: ['*'], balanced: true },
      },
    ],
    'quote-props': [2, 'consistent'],
    'curly': [2, 'all'],
    'arrow-parens': [1, 'as-needed'],
    'brace-style': [1, '1tbs'],
    'prefer-regex-literals': 0,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
}
