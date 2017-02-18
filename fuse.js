const fsbx = require('fuse-box');

const babelConfig = {
  'sourceMaps': true,
  'presets': ['latest'],
  'plugins': [
    'transform-react-jsx',
    'transform-object-rest-spread',
    'transform-decorators-legacy',
    'transform-class-properties'
  ]
}

// Create FuseBox Instance
let fuseBox = new fsbx.FuseBox({
  cache: false,
  homeDir: 'src/',
  sourceMap: {
    bundleReference: 'sourcemaps.js.map',
    outFile: './build/sourcemaps.js.map',
  },
  outFile: './build/out.js',
  plugins: [
    // fsbx.SVGPlugin(),
    // fsbx.CSSPlugin(),
    // fsbx.HTMLPlugin({useDefault: true}),
    fsbx.BabelPlugin(babelConfig),
  ]
});

// same with index.js
fuseBox.devServer('>igloo.js');
