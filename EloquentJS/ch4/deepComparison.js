// Comparing the values of actual properties
function deepEqual(obj1, obj2) {
  let isMatch = true;

  if (typeof obj1 != "object" && typeof obj2 != "object"
    || obj1 == null || obj2 == null) { // since typeof null == object
      return obj1 === obj2 ? true : false;
  }

  for (let prop1 of Object.keys(obj1)) {
    isMatch = false;
    for (let prop2 of Object.keys(obj2)) {
      if (prop1 === prop2) {                // Find a matched property
        if (obj1[prop1] !== obj2[prop2]) {  // If value not equal, return false immediately.
          return false;
        } else {
          isMatch = true;                 // If value equal, allow the next loop.
        }
      }
    }
    if (!isMatch) {                      // If it cannot find a matched property,
      return false;;                     // obviously both obj are not equal.
    }
  }

  return true;                         // Once everything is satisfied, return true.
}

let object1 = {value: 10};
let object2 = {value: 15};
let object3 = {handsome: 10};
let object4 = {value: 10};

console.log(deepEqual(object1, object4));
console.log(deepEqual(object1, object2));
console.log(deepEqual(object1, object3));
console.log(object1 == object4);
console.log(deepEqual("Phan Lan",2));
