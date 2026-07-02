const { paidModulesData } = require('../src/data/paidModulesData.js');

console.log(paidModulesData.map(m => ({ id: m.id, title: m.title })));
