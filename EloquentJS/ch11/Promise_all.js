function Promise_all(promises) {
  return new Promise((resolve, reject) => {
    let result = [], remaining = promises.length;
    for (let promise of promises) {
      promise.then(value => {
        result.push(value);
        --remaining;
        if (remaining == 0) return resolve(result);
      }, failure => reject(failure));
    }
    if(remaining == 0) return resolve(result); // This is for empty promises.
  });
}

let exampleArray = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
//let exampleArray2 = [Promise.resolve(1), Promise.reject(2), Promise.resolve(3)];

Promise_all(exampleArray).then(console.log)
.catch(reason => {
  console.log("Rejected: " + reason);
});

let example = [];
for (let empty of example) {
  console.log(empty);
}

console.log(example.length);
