export default {
  entry: 'src/index.js',
  moduleName: 'Vuerify',
  plugins: [
    require('rollup-plugin-babel')({
      presets: ['es2015-rollup']
    })
  ],
  targets: [
    { format: 'cjs', dest: 'dist/vuerify.common.js' },
    { format: 'umd', dest: 'dist/vuerify.js' }
  ]
}
