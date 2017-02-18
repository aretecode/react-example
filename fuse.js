var fsbx = require('fuse-box')
var execSync = require('child_process').execSync
var path = require('path')
var resolve = name => path.resolve(__dirname, name)

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

// http://fuse-box.org/#shimming
// http://fuse-box.org/#custom-modules-folder
var aliases = {
  'moose': './src/modules/moose.js',
  'eh': './src/modules/eh.js',
}
var shim = {}
Object.keys(aliases).forEach(alias => {
  // has to be resolved or it is not found
  var resolved = resolve(aliases[alias])
  shim[alias] = {exports: `require('${resolved}')`}
})

var fuseBox = new fsbx.FuseBox({
  // using modules folder or not does not make a difference
  // or if the modules folder has sub folders or an index
  modulesFolder: 'src/modules',

  shim,
  serverBundle: true,
  cache: false,
  homeDir: 'src/',
  sourceMap: {
    bundleReference: 'sourcemaps.js.map',
    outFile: './build/sourcemaps.js.map',
  },
  outFile: './build/out.js',
  plugins: [
    fsbx.BabelPlugin(babelConfig),
  ]
})

// arrow or not does not make a difference
// - when running dev server with node
// - or when building bundle for node being required
//
// fuseBox.devServer('>index.js');
fuseBox.bundle('>index.js').then(() => {
  console.log('bundled')

  // is either silently caught or is hijacked
  // var cmd = 'node ./build/out.js'
  // execSync(cmd, {stdio: 'inherit'})
})

setTimeout(() => {
  console.log('running...')

  // get nothing
  var cmd = 'node ./build/out.js'
  execSync(cmd)

  console.log('...done running')

  // @NOTE: debugging only
  // just to require simply after timeout to log
  eval('var eh = require("./build/out.js"); console.log(eh);')
}, 1000)
