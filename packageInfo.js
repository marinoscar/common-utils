var fs = require('fs')
  , path = require('path')
  , appInfo = JSON.parse(fs.readFileSync(process.cwd() + '/package.json', 'utf8'))
  
module.exports = appInfo;