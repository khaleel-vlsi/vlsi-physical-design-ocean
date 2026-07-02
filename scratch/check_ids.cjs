const { paidModulesData } = require('../src/data/paidModulesData.js');

paidModulesData.forEach((mod, index) => {
  if (mod.id === undefined) {
    console.log(`Module at index ${index} lacks id!`, mod);
  }
});
console.log('Total modules:', paidModulesData.length);
