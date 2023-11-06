/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  overrides: [
    {
      // 匹配views和二级目录中的index.vue
      files: ['src/views/index.vue', 'src/views/**/index.vue', 'src/components/**/index.vue'],
      rules: {
        // 给上面匹配的文件指定规则
        'vue/multi-word-component-names': 'off'
      }
    }
  ]
}
