import buble from 'rollup-plugin-buble'

export default {
  entry: 'src/index.js',
  moduleName: 'Vuerify',
  plugins: [buble()],
  globals: {
    'simple-assign': 'Object.assign'
  },
  targets: [
    { format: 'cjs', dest: 'dist/vuerify.common.js' },
    { format: 'umd', dest: 'dist/vuerify.js' }
  ]
}
