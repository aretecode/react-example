// if these import directly,
// it does not make a difference,
// so aliasing does seem to work :-)
import moosed from 'moose'
var moose = require('moose')

// this does work
require('eh')

console.log('moose, moosed')
console.log(moose)
console.log(moosed)

// moose('es')
