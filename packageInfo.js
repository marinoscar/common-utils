var fs = require('fs')
  , path = require('path')
  , appInfo = JSON.parse(fs.readFileSync(__dirname + '/package.json', 'utf8'))
  
module.exports = appInfo;