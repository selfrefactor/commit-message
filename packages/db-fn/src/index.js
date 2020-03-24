const { initBee } = require('./bees/init')
const { loadAllBee } = require('./bees/loadAll')
const { loadBee } = require('./bees/load')
const { loadJsonBee } = require('./bees/loadJson')
const { loadKeysBee } = require('./bees/loadKeys')
const { pushBee } = require('./bees/push')
const { removeBee } = require('./bees/remove')
const { saveBee } = require('./bees/save')
const { updateBee } = require('./bees/update')

exports.init = initBee
exports.update = updateBee
exports.push = pushBee
exports.save = saveBee
exports.loadJson = loadJsonBee
exports.load = loadBee
exports.loadKeys = loadKeysBee
exports.loadAll = loadAllBee
exports.remove = removeBee
