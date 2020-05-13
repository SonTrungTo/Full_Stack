class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(n1, n2) {
  let pDist = Math.random();
  if (pDist >= 0 && pDist < 0.2) {
    return n1 * n2;
  } else {
    throw new MultiplicatorUnitFailure("NOOOOOO! DESTINY IS CRUEL!");
  }
}

function testRunner(n1, n2) {
  for(;;) {
    try {
      let result = primitiveMultiply(n1, n2);
      console.log("Voila! It's", result);
      break;
    } catch (e) {
      if (e instanceof MultiplicatorUnitFailure) {
        console.log(e);
      } else {
        throw e;
      }
    }
  }
}

testRunner(10,10);
