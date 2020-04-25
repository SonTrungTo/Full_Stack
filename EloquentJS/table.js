var JOURNAL = require('/home/stt92/Documents/Full_Stack/EloquentJS/journal.js');

function tableFor(event, journal) {
  let table = [0, 0, 0, 0];
  for (let i = 0; i < journal.length; i++) {
    let entry = journal[i], index = 0;
    if(entry.events.includes(event)) index += 1;
    if(entry.squirrel)               index += 2;
    table[index] += 1;
  }
  return table;
}

function phiTable(table) {
  return          (table[3]*table[0] - table[2]*table[1]) /
              Math.sqrt((table[0] + table[1]) *
                        (table[2] + table[3]) *
                        (table[0] + table[2]) *
                        (table[1] + table[3]));
}

function typeJournal(journal) {
  let types = [];
  for (let entry of journal) {
    for (let type of entry.events ) {
      if (!types.includes(type)) {
        types.push(type);
      }
    }
  }
  return types;
}

// Calculate coefficient of all types,  only for those >0.1 and <-0.1
for (let type of typeJournal(JOURNAL)) {
  let coefficient = phiTable(tableFor(type, JOURNAL));
  if (coefficient > 0.1 || coefficient < -0.1) {
    console.log(type + ":", coefficient);
  }
}

// What if eating peanuts and not brushing teeth?
for (let entry of JOURNAL) {
  if (entry.events.includes("peanuts") &&
!entry.events.includes("brushed teeth")) {
    entry.events.push("peanut teeth");
  }
}
console.log(phiTable(tableFor("peanut teeth", JOURNAL)));
