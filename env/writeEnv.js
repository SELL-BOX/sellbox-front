const fs = require('fs')
const path = require('path')

const envKeys = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'env-list.json')).toString(),
)

const envMap = {}
for (let key of envKeys) {
  envMap[key] = process.env[key]
}

fs.writeFileSync(
  path.join(path.join(__dirname, '../public/__ENV.js')),
  `window.__ENV = ${JSON.stringify(envMap)}`,
)
