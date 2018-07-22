var start = new Date().getTime();
const heroprotocol = require('../');

console.log("heroprotocol.js v" + heroprotocol.version);
console.log("storm-replay v" + heroprotocol.stormVersion);

// You can also do this as:
//   heroprotocol.extractFiles('alterac-pass.StormReplay');

for (var i = heroprotocol.FILES.length - 1; i >= 0; i--) {
    heroprotocol.get(heroprotocol.FILES[i], 'alterac-pass.StormReplay');
}

var stop = new Date().getTime();
console.log("CPU Time: " + Math.round( ((stop-start)*1000)/1000 )/1000 + " sec");
const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log("Mem Used: " + (Math.round(used * 100) / 100) + " MB");
