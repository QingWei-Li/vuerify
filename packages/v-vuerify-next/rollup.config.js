import buble from 'rollup-plugin-buble'

export default {
  entry: 'index.js',
  moduleName: 'Vuerify.directive',
  plugins: [buble()],
  targets: [
    { format: 'cjs', dest: 'dist/vuerify.common.js' },
    { format: 'umd', dest: 'dist/vuerify.js' }
  ]
}
