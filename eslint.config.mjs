import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: true,
  formatters: true,
  typescript: true,
  vue: true,
}, {
  rules: {
    'vue/component-name-in-template-casing': ['off'],
    'no-console': 'warn',
    'vue/max-attributes-per-line': [2, {
      singleline: 3,
      multiline: 1,
    }],
  },
})
