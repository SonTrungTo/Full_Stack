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
    if(remaining == 0) return resolve(result); // This is for empty promises, for the action is asynchronous.
  });
}

let exampleArray = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
let exampleArray2 = [Promise.resolve(1), Promise.reject(2), Promise.resolve(3)];

Promise_all(exampleArray2).then(console.log)
.catch(reason => {
  console.log("Rejected: " + reason);
});

// Testing, credits to go the author's website.
Promise_all([]).then(array => {
  console.log("It should be []:", array);
});

function soon(val) {
  return new Promise(resolve => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}

Promise_all([soon(1), soon(2), soon(3)]).then(array => {
  console.log("It should be [1, 2, 3]:", array);
});

Promise_all([soon(1), Promise.reject("X"), soon(3)])
.then(array => {
  console.log("It should not show anything:", array);
})
.catch(error => {
  if (error != "X")
    console.log("Unexpected rejection:", error);
});
