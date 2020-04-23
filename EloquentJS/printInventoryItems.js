printInventoryItems(1, 11);

function printInventoryItems(nCows, nChickens) {
  let stringnCows = String(nCows), stringnChickens= String(nChickens);
  let textCow = "Cow", textChicken = "Chicken";

  if (nCows > 1)
    textCow += "s";
  if (nChickens > 1)
    textChicken += "s";

  while (stringnCows.length < 3)
    stringnCows = "0" + stringnCows;
  console.log(`${stringnCows} ${textCow}`);
  while (stringnChickens.length < 3)
    stringnChickens = "0" + stringnChickens;
  console.log(`${stringnChickens} ${textChicken}`);
}
