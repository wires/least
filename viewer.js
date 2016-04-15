var argv = require('minimist')(process.argv.slice(2))
var fs = require('fs')
var R = require('ramda')
var msgpack = require('msgpack')
var prettyjson = require('prettyjson')

var decoded_files = argv._.map(function (filename) {
  var bytes = fs.readFileSync(filename)
  return msgpack.unpack(bytes)
})

var horizontalRuler = R.join('*', R.repeat('-', 76 / 2))

var output = R.pipe(
  R.map(prettyjson.render),
  R.join('\n' + horizontalRuler + '\n')
)(decoded_files)

console.log(output)
